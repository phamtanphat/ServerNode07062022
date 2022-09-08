const express = require('express')
const bodyParser = require('body-parser')
const app = express()

// parse application/json
app.use(bodyParser.json())

app.get('/test/:id', function (req, res) {
    console.log(req.params)
})

app.post('/post', function (req, res) {
    console.log(req.body)
})


username = "phatpham0209"
password = "cpvTC1WEcaEfsQDE"
app.listen(3000)