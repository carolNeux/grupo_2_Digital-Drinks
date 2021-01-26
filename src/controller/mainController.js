module.exports = {
    index: function(req, res, next) {
        res.render('index', { title: 'Express' });
      },
    about: function(req, res){
res.render('./aboutUs')
    }
}