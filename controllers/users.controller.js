const express = require('express')
const app = express()

const pool = require('../services/database')



const usersController = {
    getAll: async(req, res) => {
        try {
            const [rows, fields] = await pool.query('SELECT * from users')
            res.json({
                data: rows
            })
        } catch (error) {
            console.log(error)
            res.json({status: "error"})
        }
    },

    register: async (req, res) => {
        try {
            const {email, password, firstname, lastname, id_groupes} = req.body

            if (!email, !password, !firstname, !lastname, !id_groupes)
                return res
                    .status(400)
                    .json({message: "Please enter all required fields"})
            if (password.length < 6)
                return res
                    .status(400)
                    .json({message: "Password mus have 6 characters"})

            const getUser = "SELECT * from users where email = ?"

            const [findUser] = await pool.query(getUser, [email])

            if (findUser.length > 0)
                return res
                    .status(400)
                    .json({message: "User already exist"})
            
            
            const sql = "INSERT INTO users (email, password, firstname, lastname, id_groupes) values (?, ?, ?, ?, ?)"

            const [rows, fields] = await pool.query(sql, [email, password, firstname, lastname, id_groupes])

            res.json({
                data: rows
            })
            
        } catch (error) {
            res.status(401).json({
                message: "User not successful created",
                error: error.mesage,
            })
        }
    }
}

module.exports = usersController
