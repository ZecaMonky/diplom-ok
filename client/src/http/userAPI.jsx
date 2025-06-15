import { $authHost, $host } from './index'
import { jwtDecode } from 'jwt-decode'

export const registration = async (email, password, name) => {
	
	const { data } = await $host.post('api/user/registration', {
		email,
		password,
		name,
		role: 'ADMIN',
	})
	localStorage.setItem('token', data)
	return jwtDecode(data)
}

export const login = async (email, password) => {
	const { data } = await $host.post('api/user/login', { email, password })
	localStorage.setItem('token', data)
	return jwtDecode(data)
}

export const check = async () => {
	const token = localStorage.getItem('token')
	if (!token) {
		return
	}
	const { data } = await $authHost.get('api/user/auth')
	localStorage.setItem('token', data.token)
	return jwtDecode(data.token)
}

export const updateUser = async (newName,newEmail) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен отсутствует');
  }
  
  try {
    const response = await $authHost.put('api/user/update', { name: newName , email: newEmail});
    localStorage.setItem('token', response.data.token); // Обновляем токен, если сервер вернул новый
    return jwtDecode(response.data.token);
  } catch (error) {
    console.error('Ошибка при обновлении данных:', error);
    throw error;
  }
};

export const changePassword = async (currentPassword, newPassword) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Токен отсутствует');
  }

  try {
    const response = await $authHost.put('api/user/change-password', {
      currentPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при изменении пароля:', error);
    throw error;
  }
};



