const express = require('express')
const app = express()

const pool = require('../services/database')

const groupesController = {
    getAll: async (req, res) => {
        try {
            const [rows, fields] = await pool.query('SELECT name FROM groupes')
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
        }
    },

    getAllUsersGroupes: async ( req, res ) => {
        try {
            const [rows, fields] = await pool.query('SELECT groupes.name, GROUP_CONCAT("[prenom: " , users.firstname, " nom: ", users.lastname ,"]") as users FROM users INNER JOIN groupes ON groupes.id = users.id_groupes GROUP BY groupes.name')
            res.json({
                data: rows
            })
        } catch (error) {
            res.status(500).json({
                error: error
            })
        }
    }
}

module.exports = groupesController