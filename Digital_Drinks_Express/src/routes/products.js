const express = require('express');
const router = express.Router();
const multer = require('multer');

const productsController = require('../controller/productsController')

const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/products'));
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

//Todos los productos//
router.get('/', productsController.index);
//Detalle de producto//
router.get('/productDetail/:id', productsController.detail);

module.exports = router; 