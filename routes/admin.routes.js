const express = require("express")
const app = express()

const router = express.Router()

const adminController = require("../controllers/admin.controller")

const requireAuthAdmin = require('../middlewares/requireAuthAdmin')

router.patch('/user/:id', requireAuthAdmin, adminController.updateUser)
router.delete('/deleteUser/:id', requireAuthAdmin, adminController.deleteUser)

router.post('/create/groupe', requireAuthAdmin, adminController.createGroupe)
router.post('/groupe/:id', requireAuthAdmin, adminController.updateGroupe)
router.post('/deleteGroupe/:id', requireAuthAdmin, adminController.deleteGroupe)

module.exports = router