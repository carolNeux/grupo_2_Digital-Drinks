const path = require('path');
const {Product, Category} = require('../../database/models');
const {body} = require ('express-validator');

module.exports = {
    productCreate: [
        body('name')
            .notEmpty()
            .withMessage('No puede estar vacío.')
            .bail()
            .isLength({min:3, max:100})
            .withMessage('El nombre debe tener mas de dos letras.'),
        body('price')
            .notEmpty()
            .withMessage('No puede estar vacío.')
            .bail()
            .isNumeric()
            .withMessage('Solo números.'),
        body('discount')
            .notEmpty()
            .withMessage('No puede estar vacío.')
            .bail()
            .isNumeric()
            .withMessage('Solo números.'),
        body('description')
            .notEmpty()
            .withMessage('No puede estar vacío.')
            .bail()
            .isLength({min:3})
            .withMessage('Debe tener mas de dos letras.')
            .bail()
            .isAlphanumeric()
            .withMessage('Debe contener solo letras y números.'),
        body('category_id')
            .notEmpty()
            .withMessage('No puede estar vacío.'),
        body('image')
            .custom(function (value, {req}) {
                if (req.file) {
                    return true;
                }
                return false;
            })
            .withMessage('No puede estar vacío.')
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
            .withMessage('No puede estar vacío.')
            .bail()
            .isLength({min:3})
            .withMessage('El nombre debe tener mas de dos letras.'),
        body('price')
            .notEmpty()
            .withMessage('No puede estar vacío.'),
        body('discount')
            .notEmpty()
            .withMessage('No puede estar vacío.'),
        body('description')
            .notEmpty()
            .withMessage('No puede estar vacío.')
            .bail()
            .isLength({min:3})
            .withMessage('Debe tener mas de dos letras.'),
        body('category_id')
            .notEmpty()
            .withMessage('No puede estar vacío.'),
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