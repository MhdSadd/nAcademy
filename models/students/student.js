const mongoose = require('mongoose')
const {Schema} =mongoose

const studentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true
    },
    phone: {
        type: Number
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        // required:true
    },
    dateRegistered:{
        type:Date,
        default:Date.now()
    },
    studentID:{
        type: String
    },
    courses:[],
    role: {
        type: String,
        default: "student",
        enum: ["student", "instructor", "admin"]
    }
})

module.exports = {Student: mongoose.model('students', studentSchema)}