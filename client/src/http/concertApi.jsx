import { jwtDecode } from 'jwt-decode'
import { $authHost, $host } from './index'

const token = localStorage.getItem('token')
export const getConcerts = async () => {
	const { data } = await $host.get('api/consert/conserts')
	return data
}

export const getSectors = async id => {
	const { data } = await $host.get('api/consert/sectors', {
		params: { city_id: id },
	})
	return data
}

export const getSector = async (id, sectorId) => {
	const { data } = await $host.get('api/consert/sectors', {
		params: { city_id: id, sector_id: sectorId },
	})
	return data
}

export const updateSectorTickets = async (sectorId, ticketsToBook, seatId) => {
	const decoded = jwtDecode(token)
	const userId = decoded.id

	const {
		data,
	} = await $authHost.post(`api/consert/sectors/${sectorId}/update-tickets`, {
		ticketsToBook,
		userId,
		seatId,
	})

	return data
}
// Бронирование
export const bookSeat = async bookingData => {
	if (!token) {
		throw new Error('Пользователь не авторизован')
	}

	const decoded = jwtDecode(token)
	const userId = decoded.id // предполагаяем, что в токене есть поле id

	const bookingDataWithUser = {
		...bookingData,
		userId, // добавляем userId к данным бронирования
	}
	const { data } = await $authHost.post(
		'api/consert/bookings',
		bookingDataWithUser
	)
	return data
}

// Отмена брони
export const cancelBooking = async bookingId => {
	const { data } = await $authHost.delete(`api/consert/bookings/${bookingId}`)
	return data
}

// Брони пользователя
export const getUserBookings = async userId => {
	const { data } = await $authHost.get(`api/consert/user/${userId}/bookings`)
  return data
}

export const getBookedSeats = async sectorId => {
	const { data } = await $host.get(`api/consert/sectors/${sectorId}/bookings`)
	return data
}
