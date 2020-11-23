const mongoose = require("mongoose");
// const validator = require("validator");
const {Schema} = mongoose;

const instructorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        // validate: (value) => {
        //     return validator.isEmail(value)
        // }
    },
    phone: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String
    },
    update_profile: {
        img: {
            type: String,
        },
        skills: {
            type: Array
        },
        work_experience: {
            type: Array
        }
    }
})

module.exports = {Instructor: mongoose.model("Instructor", instructorSchema) };