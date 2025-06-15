const { Consert, Sector, BookedSeat } = require('../models/models')

const getConserts = async (req, res) => {
	try {
		const concerts = await Consert.findAll()
		res.json(concerts)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const getSectors = async (req, res) => {
	try {
		const { city_id, sector_id } = req.query
		if (sector_id) {
			const sector = await Sector.findAll({
				where: {
					cityId: city_id,
					id: sector_id,
				},
				order: [['id', 'ASC']],
			})
			res.json(sector)
		} else {
			const sectors = await Sector.findAll({
				where: {
					cityId: city_id,
				},
				order: [['id', 'ASC']],
			})
			res.json(sectors)
		}
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

const updateSectorTickets = async (req, res) => {
	try {
		const { sector_id } = req.params
		const { ticketsToBook, userId, seatId } = req.body

		const sector = await Sector.findByPk(sector_id)
		if (!sector) {
			return res.status(404).json({ message: 'Сектор не найден' })
		}

		if (sector.totalTickets < ticketsToBook) {
			return res.status(400).json({ message: 'Недостаточно доступных билетов' })
		}

		const booking = await BookedSeat.create({
			seatId: seatId,
			sectorId: sector_id,
			consertId: sector.cityId,
			price: sector.price,
			userId,
			isBooked: true,
			paymentStatus: 'pending',
		})

		await sector.update({
			totalTickets: sector.totalTickets - ticketsToBook,
		})

		res.json({
			booking,
			remainingTickets: sector.totalTickets - ticketsToBook,
		})
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Бронирование места
const bookSeat = async (req, res) => {
	try {
		const { seatId, sectorId, consertId, userId, price } = req.body

		// Проверяем, не забронировано ли место уже
		const existingBooking = await BookedSeat.findOne({
			where: { seatId, sectorId, consertId, isBooked: true },
		})

		if (existingBooking) {
			return res.status(400).json({ message: 'Место уже забронировано' })
		}

		// Создаем бронь
		const booking = await BookedSeat.create({
			seatId,
			sectorId,
			consertId,
			userId,
			price,
			isBooked: true,
			paymentStatus: 'pending',
		})

		res.status(201).json(booking)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Отмена бронирования
const cancelBooking = async (req, res) => {
	try {
		const { booking_id } = req.params
		// 1. Находим бронь по seatId
		const booking = await BookedSeat.findOne({
			where: { seatId: booking_id },
		})
		// 2. Проверка существования брони
		if (!booking) {
			return res.status(404).json({ message: 'Бронь не найдена' })
		}
		// 3. Проверка статуса оплаты
		if (booking.paymentStatus === 'paid') {
			return res
				.status(400)
				.json({ message: 'Нельзя отменить оплаченную бронь' })
		}
		// 4. Определяем, относится ли место к фанзоне или танцполу
		const isFanZone = booking_id.startsWith('ФанЗона')
		const isDanceFloor = booking_id.startsWith('Танцпол')
		// 4. Удаление брони
		await booking.destroy()
		if (isFanZone || isDanceFloor) {
			const sectorName = isFanZone ? 'ФанЗона' : 'Танцпол'

			// Находим сектор по имени и увеличиваем availableSeats
			await Sector.increment('totalTickets', {
				by: 1,
				where: { name: sectorName, id: booking.sectorId },
			})
		}
		// 5. Успешный ответ
		res.json({
			success: true,
			message: 'Бронь успешно отменена',
			seatId: booking_id,
		})
	} catch (error) {
		console.error('Cancel booking error:', error)
		res.status(500).json({
			message: 'Ошибка при отмене брони',
			error: process.env.NODE_ENV === 'development' ? error.message : undefined,
		})
	}
}

// Получение броней пользователя
const getUserBookings = async (req, res) => {
	try {
		const { user_id } = req.params

		if (!user_id) {
			return res.status(400).json({ message: 'User ID is required' })
		}

		const bookings = await BookedSeat.findAll({
			where: {
				userId: user_id, // или userId, в зависимости от модели
				isBooked: true,
			},
			attributes: ['seatId', 'sectorId', 'consertId', 'userId', 'price'],
			include: [
				{
					model: Consert,
					attributes: ['city', 'date', 'place'],
				},
				{
					model: Sector,
					attributes: ['name', 'type'],
				},
			],
			order: [['createdAt', 'DESC']],
		})

		// if (!bookings.length) {
		//   return res.status(404).json({ message: 'No bookings found' });
		// }

		res.status(200).json(bookings)
	} catch (error) {
		console.error('Error fetching user bookings:', error)
		res
			.status(500)
			.json({ message: 'Failed to fetch bookings', error: error.message })
	}
}

const getSectorBookings = async (req, res) => {
	try {
		const { sector_id } = req.params
		console.log(sector_id)

		const bookings = await BookedSeat.findAll({
			where: {
				sectorId: sector_id,
				isBooked: true,
			},
			attributes: ['seatId'],
		})
		res.json(bookings)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

module.exports = {
	getConserts,
	getSectors,
	bookSeat,
	getUserBookings,
	cancelBooking,
	getSectorBookings,
	updateSectorTickets,
}
