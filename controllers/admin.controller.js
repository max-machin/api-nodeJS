const express = require('express')
const app = express()

const pool = require('../services/database')

const adminController = {
    updateUser: async (req, res, next) => {
        try {

            const id_user = req.params['id']

            const updatedFields = []

            let isError = false

            let isErrorPassword = false

            if (req.body.password){
                if (req.body.password.length > 5){
                
                    const salt = await bcrypt.genSalt()
                    const passwordHash = await bcrypt.hash(req.body.password, salt)

                    Object.entries(req.body).map((key, value) => {
                        if (!key.slice(',')[1]){
                            return isError = true
                        } else {
                            if (key.slice(',')[0] === "password"){
                                updatedFields.push(key.slice(',')[0] + " = " + "'" + passwordHash + "'")
                            } else {
                                updatedFields.push(key.slice(',')[0] + " = " + "'" + key.slice(',')[1] + "'")
                            }
                        }
                    
                    })   
                } else {
                    res.status(400).json({message: "Password must have 6 characters"})
                    return isError = true
                }
            } else {
                Object.entries(req.body).map((key, value) => {
                    if (!key.slice(',')[1]){
                        return isError = true
                    } else {
                        updatedFields.push(key.slice(',')[0] + " = " + "'" + key.slice(',')[1] + "'")
                    }
                })  
            }

            if (isError === true){
                res.status(400).json({ErrorMessage: "Please enter all required fields"})
            } else {

                const [rows] = await pool.query("UPDATE users SET "+ updatedFields +" , updatedAt = NOW() WHERE id = " + id_user +"")

                res.status(200).json({message: "Update successfully"})
            }

        } catch (error){
            console.log(error)
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const id_user = req.params['id']

            if (id_user != req.cookies.id){
                const sql = "DELETE FROM users WHERE id = ?"

                const deleteReq = await pool.query(sql, [id_user])

                res.status(200).send({message: "User delete with success"})
            } else {
                return res.status(400).json({ErrorMessage: "You can't delete yourself"})
            }
        } catch (error) {
            console.log(error)
        }
    },

    createGroupe: async (req, res, next) => {
        try {

            const name = req.body

            if (!name)
                return res
                    .status(400)
                    .json({
                        Message: "Please enter name for groupe"
                    })
            
            const addGroupe = "INSERT INTO groupes (name) values (?)"

            const [request] = await pool.query(addGroupe, [name])

            return res
                .status(200)
                .json({
                    Message: "Groupe add successfully"
                })
        } catch (error) {
            console.log(error)
        }
    },

    updateGroupe: async (req, res, next) => {
        try {

            const {name} = req.body

            const id_groupe = req.params['id']

            if (!name)
                return res
                    .status(400)
                    .json({
                        Message: "Please enter name for groupe"
                    })
            
            if (name.length < 3){
                return res
                    .status(400)
                    .json({
                        Message: "The group name must have 3 characters"
                    })
            }
            const addGroupe = "UPDATE groupes SET name = " + '"' + name + '"' + " , updatedAt = NOW () WHERE id = " + id_groupe + " "

            const [request] = await pool.query(addGroupe)

            return res
                .status(200)
                .json({
                    Message: "Groupe updated successfully"
                })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = adminController