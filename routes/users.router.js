const express = require("express")
const app = express()

const router = express.Router()

const userController = require("../controllers/users.controller")

router.get('/', userController.getAll)
router.post('/', userController.register)

module.exports = router