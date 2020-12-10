const express = require('express');
const router = express.Router();
const apiCoursesController = require('../../controller/api/apiCoursesController');

//Todos los productos//
router.get('/',apiCoursesController.index);


//Detalle de producto//
router.get('/:id', apiCoursesController.detail);



module.exports = router