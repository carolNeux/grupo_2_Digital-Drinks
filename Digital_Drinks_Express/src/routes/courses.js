const express = require('express');
const router = express.Router();
const multer = require('multer');

const coursesController = require('../controller/coursesController')

const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/courses'));
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

//Todos los cursos//
router.get('/', coursesController.index);

//Detalle del curso//
router.get('/coursesDetail/:id', coursesController.detail);

//crear producto//
router.get('/create', coursesController.create);
router.post('/create', coursesController.store);


module.exports = router; 