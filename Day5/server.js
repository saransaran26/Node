const express = require("express")
const mongoose = require("mongoose")
const bodyparse = require("body-parser")

const app = express()
const PORT = 4000
const DBURL = "mongodb+srv://saranchakravarthy26:guvi@b49tamil.zmmqlo1.mongodb.net/?retryWrites=true&w=majority";
// mongodb://0.0.0.0:27017/admin

const Mentor = require('./models/Mentor')
const Student = require('./models/Student')

app.use(bodyparse.json())

mongoose.connect(DBURL,{})
.then(()=>console.log("MongoDB is connected successfully")).catch((err)=>console.log("mongoDB is not connected",err))

app.post('/mentor',async(req,res)=>{
    try{
        const mentor = new Mentor(req.body)
        await mentor.save()
        res.send(mentor)
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.post('/student',async(req,res)=>{
    try{
        const student = new Student(req.body)
        await student.save()
        res.send(student)
    }
    catch(err){
        res.status(400).send(err)
    }
    
})


app.post("/mentor/:mentorId/assign",async(req,res)=>{
    try{
        const mentor = await Mentor.findById(req.params.mentorId)
        const students = await Student.find({_id:{$in:req.body.students}})
        students.forEach((student)=>{
            student.cMentor = mentor._id
            student.save()
        })
        mentor.students = [
            ...mentor.students,
            ...students.map((student)=>student._id)
        ]
        await mentor.save()
        res.send(mentor)
    }
    catch(err){
        res.status(400).send(err)
    }
    
})
//Assign and change

app.put('/student/:studentId/assignmentor/:mentorId',async(req,res)=>{
    try{
        const student = await Student.findById(req.params.studentId)
    const nmentor = await Mentor.findById(req.params.mentorId)

    if(student.cMentor){
        student.pMentor.push(student.cMentor)
    }

    student.cMentor = nmentor._id
    await student.save()
    res.send(student)
    }
    catch(err){
        res.status(400).send(err)
    } 
})

//show all students for particular mentor

app.get('/mentor/:mentorId/student',async(req,res)=>{
    try{
        const mentor = await Mentor.findById(req.params.mentorId).populate("students")
        res.send(mentor.students)
    }
    catch(err){
        res.status(400).send(err)
    }
    
})


app.listen(PORT,()=>{
    console.log("server is running on port",PORT)
})
