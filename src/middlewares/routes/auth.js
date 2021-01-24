module.exports = (req, res, next) => {
   console.log(req.session);
   if (!req.session.user) {
      res.redirect('/users/login');
   }
   next();
}