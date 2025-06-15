const Router = require('express')
const router = new Router()
const userRotes = require('./user.route')
const  consertRotes = require("./concert.route")
const  catalogRotus = require("./catalog.router")


router.use('/user', userRotes)
router.use('/consert', consertRotes)
router.use('/catalog', catalogRotus)


module.exports = router