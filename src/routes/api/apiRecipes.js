const express = require('express');
const router = express.Router();
const apiRecipesController = require('../../controller/api/apiRecipesController');

//Todos los productos//
router.get('/',apiRecipesController.index);


//Detalle de producto//
router.get('/:id', apiRecipesController.detail);



module.exports = router