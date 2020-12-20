module.exports = function (req, res, next) {

        console.log('la sesion es de ' + req.session.username);
        console.log('el id de su categoria es ' +req.session.userCategory);

    next();
}