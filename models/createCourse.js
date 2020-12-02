const mongoose  = require('mongoose')
const {Schema} = mongoose

const courseSchema = new Schema({
  courseImage:{
    type: String,
    required: true
  },
  courseName:{
      type: String,
      required: true
  },
  price:{
    type:Number,
    required:true
  },
  duration:{
    type:String,
  },
  instructor:{
    type:String
  },
  promo: String,
  description:String,
  author: String

})

module.exports = {AddCourse: mongoose.model('courses', courseSchema)}