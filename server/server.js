require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const sequelize = require('./db')
const errorHandler = require("./middleware/ErrorHandingMiddleware")
const router = require('./routes/index')

const app = express()

// Базовые middleware
app.use(cors())
app.use(express.json())

// API маршруты
app.use('/api', router)

// Статические файлы
app.use(express.static(path.join(__dirname, '../client/dist')))
app.use('/favicon.ico', express.static(path.join(__dirname, '../client/dist/favicon.ico')))

// Обработка всех остальных маршрутов
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
})

app.use(errorHandler)

const PORT = process.env.PORT || 3001

const start = async () => {
	try {
		await sequelize.authenticate()
		await sequelize.sync()
		app.listen(PORT, () => console.log(`Server start on port ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
