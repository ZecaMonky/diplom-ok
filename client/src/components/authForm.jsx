import { useContext, useState } from 'react'
import { login, registration } from '../http/userAPI'

import { observer } from 'mobx-react-lite'
import { Context } from '../app'

export default observer(function AuthForm({
	isRegister: initialRegister,
	onClose,
	onSuccess,
}) {
	const { user } = useContext(Context)
	const [isRegister, setIsRegister] = useState(initialRegister)
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')
	const [error, setError] = useState('')

	const handleSubmit = async e => {
		e.preventDefault()
		

		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
		if (!email) {
			setError('Введите email')
			return
		}
		if (!emailRegex.test(email)) {
			setError('Некорректный email')
			return
		}
		if (!password) {
			setError('Введите пароль')
			return
		}
		if (isRegister) {
			const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/
			if (!passwordRegex.test(password)) {
				setError(
					'Пароль должен содержать хотя бы одну заглавную букву, цифру и специальный символ'
				)
				return
			}
			if (!name || name.trim() === '') {
				setError('Введите имя')
				return
			}

			// Проверка на совпадение паролей
			if (password !== confirmPassword) {
				setError('Пароли не совпадают')
				return
			}
		}

		try {
			let data
			if (isRegister) {
				data = await registration(email, password, name)
			} else {
				data = await login(email, password)
			}

			setError('')
			user.setUser(data)
			user.setIsAuth(true)
			user.setUserName(data.name)
			onClose()
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	const handleOverlayClick = e => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<div className='modal-overlay' onClick={handleOverlayClick}>
			<div className='modal'>
				<form onSubmit={handleSubmit} className='form'>
					<h2 className='title'>{isRegister ? 'Регистрация' : 'Вход'}</h2>

					{error && <p className='error'>{error}</p>}

					{isRegister && (
						<input
							type='text'
							value={name}
							onChange={e => setName(e.target.value)}
							placeholder='Имя'
							className='input'
						/>
					)}

					<input
						type='email'
						value={email}
						onChange={e => setEmail(e.target.value)}
						placeholder='Email'
						className='input'
					/>

					<input
						type='password'
						value={password}
						onChange={e => setPassword(e.target.value)}
						placeholder='Пароль'
						className='input'
					/>

					{isRegister && (
						<input
							type='password'
							value={confirmPassword}
							onChange={e => setConfirmPassword(e.target.value)}
							placeholder='Повторите пароль'
							className='input'
						/>
					)}

					<button type='submit' className='submit-btn'>
						{isRegister ? 'Зарегистрироваться' : 'Войти'}
					</button>

					<p className='switch-text'>
						{isRegister ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}
						<button
							type='button'
							onClick={() => setIsRegister(!isRegister)}
							className='switch-btn'
						>
							{isRegister ? 'Войти' : 'Зарегистрироваться'}
						</button>
					</p>
				</form>
			</div>
		</div>
	)
})
