const express = require("express")
const app = express()

const router = express.Router()

const adminController = require("../controllers/admin.controller")

const requireAuthAdmin = require('../middlewares/requireAuthAdmin')

router.patch('/user/:id', requireAuthAdmin, adminController.updateUser)
router.delete('/delete/:id', requireAuthAdmin, adminController.deleteUser)

router.post('/create/groupe', requireAuthAdmin, adminController.createGroupe)

module.exports = router