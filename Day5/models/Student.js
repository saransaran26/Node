const mongoose = require('mongoose')

const studentScheme = new mongoose.Schema({
    name:String,
    cMentor:{type:mongoose.Schema.Types.ObjectId,ref:"Mentor"},
    pMentor:[{type:mongoose.Schema.Types.ObjectId,ref:"Mentor"}]
})

const student = mongoose.model("Student",studentScheme)

module.exports = student;