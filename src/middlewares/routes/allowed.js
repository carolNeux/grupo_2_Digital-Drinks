module.exports = function (req,res,next) {
    if (req.session.userCategory === 1) {
        next();
    } else if (req.session.userCategory === 2) {
        res.render('./users/forbidden');
    }
    else {
        res.redirect('/users/login');
    }   
}