const express = require("express")
const bodyparse = require('body-parser')
const mongoose = require("mongoose")

const app = express()

const PORT = 4000

const DBURL = "mongodb://0.0.0.0:27017/admin"
app.use(bodyparse.json())

const bookschema = mongoose.Schema({
    title:String,
    author:String,
    publisheddate:String,
})

const Book = mongoose.model("book",bookschema)

//connect to mongoDB
mongoose.connect(DBURL,{})
.then(()=>console.log("MongoDB is connected successfully")).catch((err)=>console.log("mongoDB is not connected",err))

app.post("/book", async (req,res)=>{
    const book = new Book(req.body)
    try{
        const savedbook = await book.save()
        res.status(201).send(savedbook)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.get("/books",async(req,res)=>{
    try{
        const books = await Book.find()
        res.status(201).send(books)
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.get("/book/:id",async(req,res)=>{
    try{
        const book = await Book.findById(req.params.id)
        if(book){
            res.status(201).send(book)
        }
        else{
            res.status(404).send("Book not found")
        }
    }
    catch(err){
        res.status(400).send(err.message)
    }
})

app.put("/book/:id",async(req,res)=>{
    
    try{
        const book = await Book.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(book){
            res.status(200).send(book)
        }
        else{
            res.status(404).send("Book not found")
        }
    }
    catch(err){
        res.status(400).send(err.message)
    }
    
})

app.delete("/book/:id",async(req,res)=>{
    
    try{
        const book = await Book.findByIdAndDelete(req.params.id)
        if(book){
            res.status(200).send(book)
        }
        else{
            res.status(404).send("Book not found")
        }
    }
    catch(err){
        res.status(400).send(err.message)
    }
    
})


app.get("/",(req,res)=>{
    res.status(200).send("Hi everyone")
})

app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})