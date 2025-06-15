const Router = require("express");
const router = new Router();
const {registration, login, check, update, changePassword} = require("../controllers/userController");
const authMiddleware = require('../middleware/authMiddleware')


router.post('/registration', registration)
router.post('/login', login)
router.get('/auth', authMiddleware, check)
router.put('/update', authMiddleware, update);
router.put('/change-password', authMiddleware, changePassword);



module.exports = router