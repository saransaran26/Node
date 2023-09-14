
const { log } = require('console');
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const outputFolder = "./output";

if(!fs.existsSync(outputFolder)){
    fs.mkdirSync(outputFolder)
}

const PORT = 3000
app.get('/createFile',(req,res)=>{
    const current = new Date()
    const year = current.getFullYear().toString()
    const month = (current.getMonth()+1).toString()
    const date = current.getDate().toString()
    const hrs = current.getHours().toString()
    const min = current.getMinutes().toString()
    const secs = current.getSeconds().toString()

    const datetimeforfilename = `${year}-${month}-${date}-${hrs}-${min}-${secs}.txt`
    const filepath = path.join(outputFolder,datetimeforfilename);

    fs.writeFile(filepath,current.toISOString(),(err)=>{
        if(err){
            res.status(500).send(`error created on ${err}`)
        }
        res.send(`file created on ${filepath}`)
    })
})

app.get('/readFile',(req,res)=>{
    fs.readdir(outputFolder,(err,files)=>{
        if(err){
            res.status(500).send(`error created on ${err}`)
        }
        console.log("list of files",files)
        const textfiles = files.filter((file)=>path.extname(file) === '.txt')
        res.json(textfiles)
    })
})

app.listen(PORT,()=>{
    console.log("server running on port",PORT)
})