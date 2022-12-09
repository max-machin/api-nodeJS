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
    }
}

module.exports = adminController