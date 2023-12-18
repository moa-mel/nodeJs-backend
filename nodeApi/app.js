const express = require('express')
const app = express()

app.get("/", (req, res) =>{
    res.send("waddup from node js")
})

const port = 8080
app.listen(port, () => {
    console.log(`A Node js api is listening on port : ${port}`)
})