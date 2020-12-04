const DB = "mongodb://localhost/nAcademy";
// require("../misc/database");
const Admin = require("../models/admin/admin").Admin;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cloudinary = require("../config/configurations").cloudinary;
const upload = require("../config/configurations").multer;
// const cloudinary = require('../config/cloudinary').cloudinary
// const upload = require('../config/multer').multer

// connecting to MongoDB with
mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`DB CONNECTED SUCCESSFULLY:::`);
  })
  .catch((err) => {
    console.log(err);
  });

const admin = new Admin({
  name: "DAKADIENG Ayuba",
  email: "ayuba@nhubnigeria.ng",
  password: "1234abcd",
  userType: "Admin",
});

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(admin.password, salt, (err, hash) => {
    if (err) {
      throw err;
    }
    admin.password = hash;
    admin
      .save()
      .then(() => {
        console.log("admin save successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  });
});
