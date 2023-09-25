const express = require("express")
const bodyparser = require("body-parser")

const app = express()

const newItem = [
    {id:1,name:"saran",date:"21sept",starttime:"6am",endtime:"7pm"},
    {id:2,name:"karthi",date:"10sept",starttime:"6.15am",endtime:"7.30pm"}
]

app.use(bodyparser.json())

app.get("/getitem",(req,res)=>{
   
    res.status(200).send(newItem)
})

app.post("/postitem",(req,res)=>{
    const item = req.body;
    if(!item.name||!item.date||!item.starttime||!item.endtime){
        res.status(400).send("item much have all items")
    }
    newItem.push(item)
    res.status(200).send("item added successfully")
})

app.put("/putitem/:id",(req,res)=>{
    
        const index = parseInt(req.params.id)
        const updateditem = req.body;
        const findindex = newItem.findIndex((item)=>item.id === index)
        if(findindex === -1){
            return res.status(400).send("Item not found")
        }
        if(!updateditem.name){
            return res.status(500).send("item name not found")
        }
        newItem[findindex].name = updateditem.name
        res.status(201).send(`item updated in id : ${index}`)
    
})

app.delete("/deleteitem/:id",(req,res)=>{
    
    const index = parseInt(req.params.id)
    const findindex = newItem.findIndex((item)=>item.id === index)
    if(findindex === -1){
        return res.status(400).send("Item not found")
    }
    newItem.splice(findindex,1)
    res.status(201).send(`item updated in id : ${index}`)

})

app.listen(4000,()=>{
    console.log(`server is running on http://localhost:4000`)
})