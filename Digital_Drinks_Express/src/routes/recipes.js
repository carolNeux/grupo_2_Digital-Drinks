const express = require('express');
const router = express.Router();
const multer = require('multer');

const recipesController = require('../controller/recipesController')

const path = require('path');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images/recipes'));
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
router.get('/', recipesController.index);

//Detalle de receta//
router.get('/recipesDetail/:id', recipesController.detail);

//edicion de una receta//
router.get('/edit/:id', recipesController.edit);
router.put('/edit/:id', recipesController.update);

//eliminar una receta//
router.delete('/delete/:id', recipesController.delete);


module.exports = router; 