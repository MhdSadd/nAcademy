const {AddCourse} = require('../../models/createCourse');
const cloudinary = require('../../config/cloudinary')



module.exports = {
  addCoursePost : async(req,res, next)=>{
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
        const newCourse = await new AddCourse({
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
  courseGet: (req, res)=>{
    const courses = AddCourse.find({}).then((err, courses)=>{
      if(err) throw err
      else{
        console.log(courses)
      }
      let pageTitle = 'Package'
      res.render('default/packages', {pageTitle, courses})
    })
    // courses.exec((err, courses)=>{
    //   if(err) throw err
    //   else{
    //     console.log(courses)
    //   }
    //   let pageTitle = 'Package'
    //   res.render('default/packages', {pageTitle, courses})
    // })
    
  },
  delete_course: async (req,res)=>{
    const id = req.params.courseId;
     await AddCourse.findByIdAndDelete(id)
          .then(deleteCourse => {
              console.log(deleteCourse);
              res.redirect("/admin/all-courses")
              return
          })
          .catch(err => console.log(err))
  },
  update_course: async(req, res)=>{
    const id = req.params.courseId;
    const courses =  await AddCourse.findById(id).then((err, courses)=>{
      if(err) throw err
      else{
        console.log("look here::::::::::::::::::",courses)
        let pageTitle = 'one'
        res.render('/', {pageTitle, courses})
      }
  
    })
    .catch(err=>console.log(err))
  },
  courseUpdateForm: async(req, res, next)=>{
    const id = req.params.courseId
    const {courseName, courseImage,price,promo,description,instructor, duration} = req.body
    await AddCourse.findByIdAndUpdate(id, (req.body))
  }
}