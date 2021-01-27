module.exports = function (req,res,next) {
    if (req.session.user.user_category_id === 1) {
        next();
    } else if (req.session.user.user_category_id === 2) {
        res.render('./users/forbidden');
    }
    else {
        res.redirect('/users/login');
    }   
}