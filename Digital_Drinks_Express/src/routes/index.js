var express = require('express');
var router = express.Router();
let mainController = require('../controller/mainController');


/* GET home page. */
router.get('/', mainController.index);
router.get('/login', mainController.showLogin);
router.get('/register', mainController.showRegister);


module.exports = router;
