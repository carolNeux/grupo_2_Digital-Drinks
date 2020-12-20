module.exports = function (req, res, next) {
    res.locals.username = false;
    res.locals.userCategory = false;

    if (req.session.username) {
        res.locals.username = req.session.username;
        res.locals.userCategory = req.session.userCategory;
    } else if (req.cookies.rememberMe) {
        req.session.username = req.cookies.rememberMe;
        res.locals.username = req.session.username;
        req.session.userCategory = req.cookies.rememberCategory;
        res.locals.userCategory = req.session.userCategory;
    }

    next();
}