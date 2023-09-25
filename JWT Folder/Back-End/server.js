const express = require("express")
const mongoose = require("mongoose")
const bodyparser = require("body-parser")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const bcrypt = require("bcrypt")
const usermodel = require("./models/User")

const app = express()
const PORT = 4000
const DBURL = "mongodb+srv://saranchakravarthy26:guvi@b49tamil.zmmqlo1.mongodb.net/?retryWrites=true&w=majority";
app.use(bodyparser.json())
app.use(cors())

mongoose.connect(DBURL,{})
.then(()=>console.log("mongoDB is connected successfully"))
.catch((err)=>console.log("could not connect to mongoDb on",err))

app.post("/api/register",async(req,res)=>{
    const {username,password} = req.body;

    const hashedpass = await bcrypt.hash(password,10)
    const user = new usermodel({username,password:hashedpass})

    try{
        await user.save()
        res.json({message:"Registered successfully"})
    }
    catch(err){
        res.status(500).json({message:"An error occurred while registering the user"})
    }
})

app.post("/api/login",async(req,res)=>{
    const {username,password} = req.body;

    const user = await usermodel.findOne({username})

    if(!user){
        res.status(400).json({message: "Authentication failed"})
    }

    const matchedpass = await bcrypt.compare(password,user.password)

    if(!matchedpass){
        res.status(401).json({message: "Authentication failed"})
    }

    const token = jwt.sign({username:user.username},"guvi@",{expiresIn:"1h"})

    res.json({token})
})

app.post("/api/protected",(req,res)=>{
    res.json({message: "Protected resource accessed successfully!!"})
})

app.listen(PORT,()=>{
    console.log("server is running on",PORT);
})