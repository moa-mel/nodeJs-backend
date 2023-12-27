const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Product = require('./models/product')
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB connect')
}).catch((error) =>{
    console.log(error)
})

app.use(express.json())

//routes
app.get('/', (req, res)=>{
    res.send('Hello node')
})

//get one product
app.get('/products/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


//get all product
app.get("/products", async(req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


//create
app.post('/products', async(req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

//update
app.put('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        //we cannot find any product in database
        if(!product){
          return res.status(404).json({message:`cannot find any product with ID ${id}`})  
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


//delete
app.delete('/products/:id', async(req, res) =>{
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:`cannot find any product with ID ${id}`}) 
        }
        res.status(200).json(product)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


app.listen(8080, () => {
    console.log('Node is listening')
})