const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models/models')

const generateJwt = (id, email, role,name) => {
	return jwt.sign({ id, email, role , name}, process.env.JWT_SECRET, {
		expiresIn: '24h',
	})
}

async function registration(req, res, next) {
	const { email, password, role, name } = req.body
	if (!email || !password) {
		return next(ApiError.badRequest('Некорректный email или password'))
	}
	const candidate = await User.findOne({ where: { email } })
	if (candidate) {
		return next(
			ApiError.badRequest('Пользователь с таким email уже существует')
		)
	}
	const hashPassword = await bcrypt.hash(password, 5)
	const user = await User.create({ email, password: hashPassword, role, name })
	const token = generateJwt(user.id, user.email, user.role, user.name)
	return res.json(token)
}

async function login(req, res,next) {
	const {email,password} = req.body
	const user = await User.findOne({ where:{email}})
	if (!user) {
		return next(ApiError.internal('Пользователь не найден'))
	}
	let comparePassword = bcrypt.compareSync(password, user.password)
	if (!comparePassword) {
		return next(ApiError.internal('Неверный пароль'))
	}
	const token = generateJwt(user.id, user.email, user.role ,user.name)
	return res.json(token)
}

async function check(req, res, next) {
	const token = generateJwt(req.user.id, req.user.email, req.user.role,req.user.name);
	return res.json({ token });
}

const update = async (req, res) => {
	try {
			const {name, email} = req.body; // Получаем новые данные из тела запроса
			const userId = req.user.id; // Получаем ID из authMiddleware
			
			// Находим пользователя и обновляем его данные
			const user = await User.findOne({where: {id: userId}});
			if (name) user.name = name;
			if (email) user.email = email;
			
			await user.save();
			
			// Генерируем новый токен с обновленными данными
			const token = generateJwt(user.id, user.email, user.role ,user.name);
			
			return res.json({token});
	} catch (e) {
			console.log(e);
			res.status(400).json({message: 'Update error'});
	}
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    // 1. Находим пользователя
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // 2. Проверяем текущий пароль
    const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Неверный текущий пароль' });
    }

    // 3. Хешируем новый пароль
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    
    // 4. Обновляем пароль
    user.password = hashedPassword;
    await user.save();

    // 5. Генерируем новый токен (опционально)
    const token = generateJwt(user.id, user.email, user.role , user.name);

    return res.json({ token, message: 'Пароль успешно изменен' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Ошибка при изменении пароля' });
  }
};

module.exports = {
	registration,
	login,
	check,
	update,
	changePassword
}
