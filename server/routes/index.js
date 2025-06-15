const Router = require('express')
const router = new Router()
const userRotes = require('./user.route')
const consertRotes = require("./concert.route")
const catalogRoutes = require("./catalog.router")

router.use('/user', userRotes)
router.use('/catalog', catalogRoutes)
router.use('/consert', consertRotes)

module.exports = router