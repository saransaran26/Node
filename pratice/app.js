
const express = require("express")

const app = express()

const PORT = 3000
app.get("/",(req,res)=>{
    res.send("Hello from express")
})
app.get("/home",(req,res)=>{
    res.send("Hello from home page")
})
app.get("/about",(req,res)=>{
    res.send("Hello everyone welcome to the world of here to display this , Hello everyone welcome to the world of here to display this,Hello everyone welcome to the world of here to display this")
})
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})