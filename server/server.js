require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const errorHandler = require("./middleware/ErrorHandingMiddleware")
const router = require('./routes/index')

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)
app.use(errorHandler)

const PORT = 3001

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
