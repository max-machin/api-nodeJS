/* Require express */
const express = require('express')
const app = express()

/* Listening port */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

app.use(express.urlencoded({extended: false}))
app.use(express.json())

require('dotenv').config()

const usersRouter = require('./routes/users.router')

app.use('/user', usersRouter)

/* Index route */
app.get('/', (req, res) => {
    res.send("World")  
})




