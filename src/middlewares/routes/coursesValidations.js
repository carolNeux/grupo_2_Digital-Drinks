const path = require('path');
const {body} = require ('express-validator');

module.exports = {
    courseCreate: [
        body('name')
        .notEmpty()
        .withMessage('Agregar nombre de producto.')
        .bail()
        .isLength({min:3, max:100})
        .withMessage('El nombre debe tener mas de dos letras.'),
    body('price')
        .notEmpty()
        .withMessage('Agregar precio.')
        .bail()
        .isNumeric()
        .withMessage('Solo números.'),
    body('discount')
        .notEmpty()
        .withMessage('Agregar descuento (0 a 100).')
        .bail()
        .isNumeric()
        .withMessage('Solo números.'),
    body('description')
        .notEmpty()
        .withMessage('Agregar una descripción.')
        .bail()
        .isLength({min:3})
        .withMessage('Debe tener mas de dos letras.')
        .bail()
        .isAlphanumeric()
        .withMessage('Debe contener solo letras y números.'),
    body('image')
        .custom(function (value, {req}) {
            if (req.file) {
                return true;
            }
            return false;
        })
        .withMessage('Agregar una imagen formato jpg, jpeg, png, svg.')
        .bail()
        .custom(function (value, {req}) {
            const extension = [".jpg", ".jpeg", ".png", ".svg"];
            const resultExt = path.extname(req.file.originalname);
            const accepted = extension.includes(resultExt)
            return accepted;
        })
        .withMessage('Formatos aceptados jpg, jpeg, png, svg ') 
    ],
    couseEdit: [
        body('name')
            .notEmpty()
            .withMessage('Agregar nombre del producto.')
            .bail()
            .isLength({min:3})
            .withMessage('El nombre debe tener mas de dos letras.'),
        body('price')
            .notEmpty()
            .withMessage('Agregar precio del producto.'),
        body('discount')
            .notEmpty()
            .withMessage('Agregar descuento.'),
        body('description')
            .notEmpty()
            .withMessage('Agregar descripción del producto.')
            .bail()
            .isLength({min:3})
            .withMessage('Debe tener mas de dos letras.'),
        body('image')
            .custom(function (value, {req}) {
                if (value == "undefined") {
                    return true
                } else {
                    if (req.file) {
                        return true;
                    }
                }
                return true;
            })
            .withMessage('No puede estar vacío.')
            .bail()
            .custom(function (value, {req}) {
                if (req.file == undefined) {
                    return true
                } else {
                    const extension = [".jpg", ".jpeg", ".png", ".svg"];
                    const resultExt = path.extname(req.file.originalname);
                    const accepted = extension.includes(resultExt)
                    return accepted;
                }
            })
            .withMessage('Formatos aceptados jpg, jpeg, png, svg ')
    ]
}