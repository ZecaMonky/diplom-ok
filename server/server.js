require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const sequelize = require('./db')
const errorHandler = require("./middleware/ErrorHandingMiddleware")
const router = require('./routes/index')

const app = express()

// Настройка CORS
app.use(cors({
	origin: process.env.CLIENT_URL || '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}))

// Парсинг JSON
app.use(express.json())

// API маршруты
app.use('/api', router)

// Статические файлы
app.use(express.static(path.join(__dirname, '../client/dist')))

// Обработка всех остальных маршрутов
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

// Обработка ошибок должна быть последней
app.use(errorHandler)

const PORT = process.env.PORT || 5000

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
