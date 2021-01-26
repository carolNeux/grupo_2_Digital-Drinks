var express = require('express');
var router = express.Router();
let mainController = require('../controller/mainController');


/* GET home page. */
router.get('/', mainController.index);

/*about us */
router.get("/aboutUs", mainController.about);

module.exports = router;
