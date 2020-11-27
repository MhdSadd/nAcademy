const { Instructor } = require("../../models/instructorsModel");

module.exports = {
    index: (req, res, next) => {
        const pagetitle = "User";
        const email = req.user.email;
        res.render("users/index", {pagetitle, email});
        next();
    },
    profile: (req, res, next) => {
        const pagetitle = "Profile";
        const name = req.user.name;
        const email = req.user.email;
        const phone = req.user.phone;
        res.render("users/profile", {pagetitle, email, name, phone});
        next();
    },
    basic_table: (req, res, next) => {
        const pagetitle = "Basic Table";
        const email = req.email;
        res.render("users/basic-table", {pagetitle, email});
        next();
    }, 
    maps: (req, res, next) => {
        const pagetitle = "Map";
        const email = req.email;
        res.render("users/map", {pagetitle, email});
        next();
    },
    icons: (req, res, next) => {
        const pagetitle = "Icons";
        const email = req.email;
        res.render("users/icons", {pagetitle, email});
        next();
    },
    blank_page: (req, res, next) => {
        const pagetitle = "Blank Page";
        const email = req.email;
        res.render("users/blank-page", {pagetitle, email});
        next();
    },
    update_profileGet: (req, res) => {
        const pagetitle = "Profile Update";
        const name = req.user.name;
        const email = req.user.email;
        const phone = req.user.phone;
        const avatar = req.user.avatar;
        const skills = req.user.skills;
        const experience = req.user.experience;
        const id = req.user.id;
        res.render("users/update_profile", {
            pagetitle, 
            name, 
            email, 
            phone,
            avatar,
            skills,
            experience,
            id
        });
    },
    // update_profilePut: async (req, res) => {
    //     const id = req.params.id;
    //     await Instructor.findByIdAndUpdate(id, req.body)
    //     .then(async(instructor) => {
    //         if(!instructor) {
    //             console.log("Error");
    //             req.flash("error_msg", "Cannot update");
    //         } else {
    //             console.log(`Update was successfull ${instructor}`);
    //             req.flash("success_msg", "Your update was Successful");
    //         }
    //     })
    //     .catch((err) => {
    //         console.log("An error occured while updating");
    //         req.flash("error_msg", "Your Update couldn't be processed");
    //     })
    // }
    update_profilePut: (req, res) => {
        if (!req.body) {
            return res.status(400).send({
              message: "Data to update can not be empty!"
            });
          }
        
          const id = req.user.id;
        
          Instructor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
              if (!data) {
                res.status(404).send({
                  message: `Cannot update instructor with id=${id}. Maybe instructor was not found!`
                });
              } else res.send({ message: "instructor was updated successfully." });
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating instructor with id=" + id
              });
            });
    }
}