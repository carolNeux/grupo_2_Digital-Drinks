const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const productsController = require('../controller/productsController')

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

//product cart//
router.get('/productsCart', productsController.cart);

//creacion de producto//
router.get('/new', productsController.new);
router.post('/create', upload.single("image"), productsController.create);

//edicion de un producto//
router.get('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.single("image"), productsController.update);

//eliminar un producto
router.delete('/delete/:id', productsController.delete);

// busqueda de productos
router.get('/search', productsController.search);


module.exports = router; 