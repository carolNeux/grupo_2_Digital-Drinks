const path = require('path');
const {Product, Category} = require('../../database/models');
const {body} = require ('express-validator');

module.exports = {
    productCreate: [
        body('name')
            .notEmpty()
            .withMessage('Agregar nombre del producto.')
            .bail()
            .isLength({min:3, max:100})
            .withMessage('El nombre debe tener mas de dos letras.'),
        body('price')
            .notEmpty()
            .withMessage('Agregar precio del producto.')
            .bail(),
        body('discount')
            .notEmpty()
            .withMessage('Agregar descuento del producto (0-100).')
            .bail(),
        body('description')
            .notEmpty()
            .withMessage('Agregar descripción del producto.')
            .bail()
            .isLength({min:3})
            .withMessage('Debe tener mas de dos letras.')
            .bail(),
        body('category_id')
            .notEmpty()
            .withMessage('Agregar categoría del producto.'),
        body('image')
            .custom(function (value, {req}) {
                if (req.file) {
                    return true;
                }
                return false;
            })
            .withMessage('Agregar una imagen formato jpg, jpeg, png, svg..')
            .bail()
            .custom(function (value, {req}) {
                const extension = [".jpg", ".jpeg", ".png", ".svg"];
                const resultExt = path.extname(req.file.originalname);
                const accepted = extension.includes(resultExt)
                return accepted;
            })
            .withMessage('Formatos aceptados jpg, jpeg, png, svg ')
    ],
    productEdit: [
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
            .withMessage('Agregar descuento del producto (0-100).'),
        body('description')
            .notEmpty()
            .withMessage('Agregar descripción del producto.')
            .bail()
            .isLength({min:3})
            .withMessage('Debe tener mas de dos letras.'),
        body('category_id')
            .notEmpty()
            .withMessage('Agregar categoría del producto.'),
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
            .withMessage('Agregar una imagen formato jpg, jpeg, png, svg..')
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