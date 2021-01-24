module.exports = function (req,res,next) {
    if (req.session.user.userCategory === 1) {
        next();
    } else if (req.session.user.userCategory === 2) {
        res.render('./users/forbidden');
    }
    else {
        res.redirect('/users/login');
    }   
}