const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('World')
    res.end()
})

app.route('/register')
    .get(function(req, res){
        res.send('Create a new user')
    })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})