const express = require("express")
const app = express()

const router = express.Router()

const groupesController = require('../controllers/groupes.controller')

router.get('/list', groupesController.getAll)
router.get('/listGrpUsers', groupesController.getAllUsersGroupes)

module.exports = router