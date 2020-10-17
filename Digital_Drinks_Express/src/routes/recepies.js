const express = require('express');
const router = express.Router();
const multer = require('multer');

const recepiesController = require('../controller/recepiesController')

const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/recepies'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

var upload = multer({ storage: storage });

// ******* Routes ***********

router.get('/', recepiesController.index);


module.exports = router; 