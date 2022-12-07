const express = require("express")
const app = express()

const router = express.Router()

const userController = require("../controllers/users.controller")


router.post('/register', userController.register)
router.get('/list', userController.getAll)
router.post('/login', userController.login)

module.exports = router