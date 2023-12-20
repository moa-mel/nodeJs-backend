const express = require('express')
const app = express()
const mongoose = require('mongoose')
const morgan = require("morgan");
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
dotenv.config()

//db
mongoose.connect(process.env.MONGO_URI)
.then(()=>
    console.log('DBConnected')
)

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
})

//bring in routes
const postRoutes = require('./routes/post')

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json())
app.use(expressValidator())
app.use("/", postRoutes)

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`A Node js api is listening on port : ${port}`)
})