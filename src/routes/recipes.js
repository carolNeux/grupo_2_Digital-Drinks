const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const recipesController = require('../controller/recipesController');
const allowed = require('../middlewares/routes/allowed');
const recipesValidations = require('../middlewares/routes/recipeValidations');

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

/* Todas las recetas */
router.get('/', recipesController.index);

//Detalle de receta//
router.get('/recipesDetail/:id', recipesController.detail);

//crear receta//
router.get('/new', allowed, recipesController.new);
router.post('/create', upload.single("image"), allowed, recipesValidations.recipeCreate, recipesController.create);

//edicion de una receta//
router.get('/edit/:id', allowed, recipesController.edit);
router.put('/edit/:id', upload.single("image"), allowed, recipesValidations.recipeEdit, recipesController.update);

//eliminar un producto
router.delete('/delete/:id', allowed, recipesController.delete)

//search un producto
router.get('/search', recipesController.search)

module.exports = router; 