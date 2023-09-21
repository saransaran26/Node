
// const express = require('express')
// const bodyparser = require('body-parser')

// const app = express()
// const PORT = 3000

// app.use(bodyparser.json());

// let items = [
//     {id:1,name:"Item 1"},
//     {id:2,name:"Item 2"}
// ]

// app.get('/getItem',(req,res)=>{
//     res.json(items)
// })

// app.post('/item',(req,res)=>{
//     const newItem = req.body;
//     if(!newItem.id || !newItem.name){
//         return res.status(500).send("Item must have an id and name")
//     }

//     items.push(newItem)
//     res.status(201).send(`items added with id:${newItem.id}`)
// })

// app.listen(PORT,()=>{
//     console.log(`server is Running on port http://localhost:${PORT}`);
// })

const express = require("express")
const bodyparser = require("body-parser")

const app = express()
const PORT = 3000

app.use(bodyparser.json())
const items = [
    {id:1,name:"saran"},
    {id:2,name:"Tamil"}
]

app.get("/getitem",(req,res)=>{
    res.json(items)
})

app.post("/item",(req,res)=>{
    const newItem = req.body;
    newItem.map((up)=>{
        if(!up.id || !up.name){
            return res.status(500).send("item much have id and name")
        }
    
        items.push(up)
        res.status(201).send(`item added with id:${up.id}`)
    })
   
})

app.put("/item/:id",(req,res)=>{
    const itemid = parseInt(req.params.id)
    const updatedItem = req.body;
    const index = items.findIndex(item => item.id === itemid)
    if(index === -1){
        return res.status(400).send("Item not found")
    }

    if(!updatedItem.name){
        return res.status(500).send("item name not found")
    }

    items[index].name = updatedItem.name
    res.status(201).send(`item updated in id : ${itemid}`)
})

app.delete("/item/:id",(req,res)=>{
    const itemid = parseInt(req.params.id)
    const index = items.findIndex(item => item.id === itemid)
    if(index === -1){
        return res.status(400).send("item id not found")
    }

    items.splice(index,1)
    res.status(201).send(`item deleted on id : ${itemid}`)
})

app.listen(PORT,()=>{
    console.log(`server is Running on port http://localhost:${PORT}`);
})