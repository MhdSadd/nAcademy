const {Course} = require('../../models/createCourse');
const {Student} = require("../../models/studentsModel");
const cloudinary = require('../../config/cloudinary');



module.exports = {
  CoursePost : async(req,res, next)=>{
    const {courseName, price, duration, instructor, promo, description} = req.body
    const courseImage = req.file
    let errors = [];
    console.log('file::::::::::',req.file)
    console.log('body::::::::::',req.body)
    if(!courseImage || !courseName || !price || !duration){
      errors.push({ msg: "All field required" });
    }
    else{
      
      await cloudinary.v2.uploader.upload(req.file.path, async(err, result)=>{
        console.log('consoling result:::::::', result)
        const newCourse = await new Course({
          courseName,
          price,
          duration,
          instructor,
          promo,
          description,
          courseImage:await result.secure_url
        })
        newCourse.save()
      res.redirect('/admin')
       })
    }
  
  },
  allCourseGet: (req, res)=>{
    // const courses = Course.find({}).then((err, courses)=>{
    //   if(err) throw err
    //   else{
    //     // console.log(courses)
    //   }
    //   let pageTitle = 'Package'
    //   res.render('default/packages', {pageTitle, courses})
    // })
    const courses = Course.find({})
    courses.exec((err, courses)=>{
      if(err) throw err
      else{
        console.log(courses)
      }
      let pageTitle = 'Package'
      res.render('defaultViews/packages', {pageTitle, courses})
    })
    
  },
  singleCourseGet: async(req,res)=>{
    const id = req.params.courseId
    // console.log('look::::::::::::::', id)
    await Course.findById(id)
    .then(single => {
      const pageTitle = "single Package";
      res.render('defaultViews/single-package', {pageTitle, single})
    })
    .catch(err=>console.log(err))
  },

  sign_upCourse: async(req, res, next)=>{
    let _id = req.params.courseId
    console.log(_id)
    await Course.findById({_id})
    .then(course=>{
      let studentID = req.body
      Student.findOne(studentID)
      .then(student=>{
        student.courses.push(course)
        // console.log(student)
        student.save()
      })
    })
    .catch(err=>{console.log(err)})


  }
}