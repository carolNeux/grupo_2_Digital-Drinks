module.exports = function (req,res,next) {
<<<<<<< HEAD
    if (req.session.userCategory === 1 || req.session.userCategory === 2) {
        next();
    }// else if (req.session.userCategory === 2) {
    //     res.render('./users/forbidden');
    // }
=======
    if (req.session.user.user_category_id === 1) {
        next();
    } else if (req.session.user.user_category_id === 2) {
        res.render('./users/forbidden');
    }
>>>>>>> shoppingCart
    else {
        res.redirect('/users/login');
    }   
}