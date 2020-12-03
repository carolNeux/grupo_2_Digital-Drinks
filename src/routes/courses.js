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

//Consulta de curso//
router.get('/coursesContact', coursesController.consult);
router.post('/coursesContact', coursesController.redireccion)

//crear curso//
router.get('/new', coursesController.new);
router.post('/create', upload.single("image"), coursesController.create);

//editar un curso//
router.get('/edit/:id', coursesController.edit);
router.put('/edit/:id', upload.single("image"), coursesController.update);

/*buscar un curso */
router.get('/search', coursesController.search);
/*borrar un curso */
router.delete('/delete/:id', coursesController.destroy)


module.exports = router; 