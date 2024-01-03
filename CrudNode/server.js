const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const productRoute = require('./routes/productRoute')
const errorMiddleware = require('./middleware/errorMiddleware')
dotenv.config()



mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB connect')
}).catch((error) =>{
    console.log(error)
})

var corsOptions = {
    origin: 'http://example.com',
    optionsSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))
//middleware
app.use('/api/products', productRoute)
app.use(errorMiddleware)

//routes
app.get('/', (req, res)=>{
    res.send('Hello node')
})



const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Node is listening on ${port}`)
})