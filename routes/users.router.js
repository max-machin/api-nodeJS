const express = require("express")
const app = express()

const router = express.Router()

const userController = require("../controllers/users.controller")

const requireAuth = require('../middlewares/requireAuth')


router.post('/register', userController.register)
router.get('/list', userController.getAll)
router.post('/login', userController.login)
router.get('/:id', requireAuth, userController.getMe)
router.patch('/addGroupe', userController.addGroupe)
router.patch('/updateData', userController.updateData)


module.exports = router