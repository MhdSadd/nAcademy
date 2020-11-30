module.exports = {
    globalVariable: (req, res, next) => {
        res.locals.success_msg = req.flash("success_msg");
        res.locals.error_msg = req.flash("error_msg");
        res.locals.error = req.flash("error");
        res.locals.session = req.session;
        res.locals.instructor = req.instructor;
        res.locals.user = req.user;
        // res.locals.isAuthenticated = isAuthenticated();

    
        next();
    }
    // app.use((req, res, next) => {
    //     res.locals.success_msg = req.flash('success_msg');
    //     res.locals.error_msg = req.flash('error_msg');
    //     res.locals.error = req.flash('error');
    //     res.locals.user = req.user;
    //     // app.locals.fromNow = function(date){
    //     //     return moment(date).fromNow();
    //     //     }
    //     // app.locals.moment = moment; 
    //     // app.locals.shortDateFormat = shortDateFormat;
    //     // res.locals.isAuthenticated = 
    //     next();
    // })
}