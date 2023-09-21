const express = require("express")
const mongoose = require("mongoose")
const bodyparse = require("body-parser")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT
// const DBURL = "mongodb://0.0.0.0:27017/admin";

// mongoose.connect(DBURL,{})
// .then(()=>console.log("MongoDB is connected successfully")).catch((err)=>console.log("mongoDB is not connected",err))

app.use(bodyparse.json())

function sampleauthentication(req,res,next){
    if(req.query.token === 'mentor'){
        req.user = {id:1,name:"manikandan"}
        next()
    }
    else if(req.query.token === 'student'){
        req.user = {id:2,name:"saran"}
        next()
    }
    else{
        res.status(401).send("unauthorized")
    }
}
function logrequest(req,res,next){
    console.log(`received ${req.method} request for ${req.url} at ${new Date().toISOString()}`)
    next()
}
app.use('/secure',sampleauthentication)
app.use(logrequest)
app.get('/secure/profile',(req,res)=>{
    res.send(`hello,${req.user.name}`)
})

app.get('/sample',(req,res)=>{
    res.send("hello sample")
})

app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})