var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Pagina para nuestros usuarios');
});

module.exports = router;
