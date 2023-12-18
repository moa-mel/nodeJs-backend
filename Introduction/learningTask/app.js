const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('hey, wadup')
})

app.listen(3000)