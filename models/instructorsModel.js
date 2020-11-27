const mongoose = require("mongoose");
// const validator = require("validator");
const {Schema} = mongoose;

const instructorSchema = new Schema({
    approvedInstructor: {
        type: Boolean,
        default: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
        // validate: (value) => {
        //     return validator.isEmail(value)
        // }
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: "instructor",
        enum: ["student", "instructor", "admin"]
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String
    },
    
    avatar: {
        type: String,
    },
    skills: {
        type: Array
    },
    experience: {
        type: Array
    }

})

module.exports = {Instructor: mongoose.model("Instructor", instructorSchema) };