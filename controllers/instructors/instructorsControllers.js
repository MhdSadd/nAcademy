const { Instructor } = require("../../models/instructorModel");

module.exports = {
    index: (req, res, next) => {
        const pagetitle = "User";
        const email = req.user.email;
        res.render("instructor/index", {pagetitle, email});
        next();
    },
    profile: (req, res, next) => {
        const pagetitle = "Profile";
        const name = req.user.name;
        const email = req.user.email;
        const phone = req.user.phone;
        res.render("instructor/profile", {pagetitle, email, name, phone});
        next();
    },
    basic_table: (req, res, next) => {
        const pagetitle = "Basic Table";
        const email = req.email;
        res.render("instructor/basic-table", {pagetitle, email});
        next();
    }, 
    maps: (req, res, next) => {
        const pagetitle = "Map";
        const email = req.email;
        res.render("instructor/map", {pagetitle, email});
        next();
    },
    icons: (req, res, next) => {
        const pagetitle = "Icons";
        const email = req.email;
        res.render("instructor/icons", {pagetitle, email});
        next();
    },
    blank_page: (req, res, next) => {
        const pagetitle = "Blank Page";
        const email = req.email;
        res.render("instructor/blank-page", {pagetitle, email});
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
        res.render("instructor/update_profile", {
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
    update_profilePut: async (req, res) => {
        const id = req.user.id;
        await Instructor.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(async(instructor) => {
            if(!instructor) {
                console.log("Cannot update Instructor Details");
                req.flash("error_msg", "Cannot update");
            } else {
                await instructor.save();
                res.redirect("/user/profile");
                console.log(`Update was successfull ${instructor}`);
                req.flash("success_msg", "Your update was Successful");
            }
        })
        .catch((err) => {
            console.log("An error occured while updating");
            req.flash("error_msg", "Your Update couldn't be processed");
            res.redirect("/user/update-profile");
        })
    }
    // update_profilePut: (req, res) => {
    //     if (!req.body) {
    //         return res.status(400).send({
    //           message: "Data to update can not be empty!"
    //         });
    //       }
        
    //       const id = req.user.id;
        
    //       Instructor.findByIdAndUpdate(id, req.body)
    //         .then(data => {
    //           if (!data) {
    //             res.status(404).send({
    //               message: `Cannot update instructor with id=${id}. Maybe instructor was not found!`
    //             });
    //           } else res.send({ message: "instructor was updated successfully." + id + data });
    //         })
    //         .catch(err => {
    //           res.status(500).send({
    //             message: "Error updating instructor with id=" + id
    //           });
    //         });
    // }
}