const express = require("express")
const bodyparser = require("body-parser")
const mongoose = require("mongoose")

const app = express()

const DBURL = "mongodb+srv://saranchakravarthy26:guvi@b49tamil.zmmqlo1.mongodb.net/?retryWrites=true&w=majority";

const bookingschema = mongoose.Schema({
    id:String,
    name:String,
    date:String,
    starttime:String,
    endtime:String,
})

const Hotel = mongoose.model("Hotel",bookingschema)


mongoose.connect(DBURL,{})
.then(()=>console.log("MongoDB connected Succesfully")).catch((err)=>console.log("MongoDB is not Connected",err))

app.use(bodyparser.json())

app.get("/getitem",async(req,res)=>{
   try{
    const hotel = await Hotel.find()
    res.send(hotel)
   }
   catch(err){
    res.status(400).send(err)
   }
})

app.get("/getitem/:id",async(req,res)=>{
    try{
        const hotel = await Hotel.findById(req.params.id)
        if(hotel){
            res.send(hotel)
        }
        else{
            res.status(404).send("Book Not Found")
        }
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.post("/postitem",async(req,res)=>{
    const hotel = new Hotel(req.body)
    try{
        const savedhotel = await hotel.save()
        res.send(savedhotel)
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.put("/putitem/:id",async(req,res)=>{
    
    try{
        const hotel = await Hotel.findByIdAndUpdate(req.params.id,req.body,{new:true})
        if(hotel){
            res.send(hotel)
        }
        else{
            res.status(400).send("Hotel Id not Found")
        }
    }
    catch(err){
        res.send(400).send(err)
    }
})

app.delete("/deleteitem/:id",async(req,res)=>{
    try{
        const hotel = await Hotel.findByIdAndDelete(req.params.id)
        if(hotel){
            res.send(hotel)
        }
        else{
            res.status(400).send("Hotel Id not Found")
        }
    }
    catch(err){
        res.send(400).send(err)
    }
})

app.listen(4000,()=>{
    console.log(`server is running on http://localhost:4000`)
})