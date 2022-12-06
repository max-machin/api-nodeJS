const express = require("express")
const app = express()

const router = express.Router()

const userController = require("../controllers/users.controller")

router.get('/', userController.getAll)
router.post('/', userController.register)
router.post('/login', userController.login)

module.exports = router