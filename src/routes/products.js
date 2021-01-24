const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const productsController = require('../controller/productsController');
const allowed = require('../middlewares/routes/allowed');
const productsValidations = require('../middlewares/routes/productsValidations');

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

//Todos los productos//
router.get('/', productsController.index);

//Detalle de producto//
router.get('/productDetail/:id', productsController.detail);

//creacion de producto//
router.get('/new', allowed, productsController.new);
router.post('/create', upload.single("image"), allowed, productsValidations.productCreate, productsController.create);

//edicion de un producto//
router.get('/edit/:id', allowed, productsController.edit);
router.put('/edit/:id', upload.single("image"), allowed, productsValidations.productEdit, productsController.update);

//eliminar un producto
router.delete('/delete/:id', allowed, productsController.delete);

// busqueda de productos
router.get('/search', productsController.search);

module.exports = router; 