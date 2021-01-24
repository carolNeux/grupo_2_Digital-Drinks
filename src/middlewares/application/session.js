module.exports = function (req, res, next) {

    if (req.session.user) { 
        
    console.log(`la sesion es de ${req.session.user.username}`);
    console.log(`el id de su categoria es ${req.session.user.user_category_id}`);
    console.log(`el id de usuario es ${req.session.user.id}`);
    
    } else {
        console.log('No hay nadie logueado! ');
    }

    next();
}