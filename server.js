/* Require express */
const express = require('express')
const app = express()
const cookieParser = require('cookie-parser');
/* Listening port */
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

app.use(cookieParser())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

require('dotenv').config()

const usersRouter = require('./routes/users.routes')
const groupesRouter = require('./routes/groupes.routes')
const adminRouter = require('./routes/admin.routes')


app.use('/user', usersRouter)
app.use('/groupes', groupesRouter)
app.use('/admin', adminRouter)

/* Index route */
app.get('/', (req, res) => {
    res.send("World")  
})




