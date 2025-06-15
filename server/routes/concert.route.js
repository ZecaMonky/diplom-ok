const express = require('express')
const {
	getConserts,
	getSectors,
	bookSeat,
  cancelBooking,
  getUserBookings,
	getSectorBookings,
	updateSectorTickets
} = require('../controllers/concert.controller.js')

const router = express.Router()

router.get('/conserts', getConserts)
router.get('/sectors', getSectors)

// Бронирование мест
router.post('/bookings', bookSeat)
router.delete('/bookings/:booking_id', cancelBooking)

// Получение броней пользователя
router.get('/user/:user_id/bookings', getUserBookings)

router.get('/sectors/:sector_id/bookings', getSectorBookings)
router.post('/sectors/:sector_id/update-tickets', updateSectorTickets);

module.exports = router
