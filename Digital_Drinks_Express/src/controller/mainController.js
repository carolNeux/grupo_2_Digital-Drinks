module.exports = {
    index: function(req, res, next) {
        res.render('index', { title: 'Express' });
      },
    showLogin: (req,res) => {
        res.render('./users/login');
    },
    showRegister: (req,res) => {
        res.render('./users/register');
    },
    
}