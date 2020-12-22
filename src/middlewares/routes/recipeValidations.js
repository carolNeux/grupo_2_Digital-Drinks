const path = require('path');
const {body} = require ('express-validator');

module.exports = {
    recipeCreate: [
        body('name')
            .notEmpty()
            .withMessage('Agregar nombre de la receta.')
            .bail()
            .isLength({min:3, max:100})
            .withMessage('El nombre debe tener mas de dos letras.'),
        body('ingredients')
            .notEmpty()
            .withMessage('Agregar ingredientes de la receta.')
            .bail()
            .isLength({min:3})
            .withMessage('La descripcion debe tener mas de dos letras.'),
        body('method')
            .notEmpty()
            .withMessage('Agregar metodo de la receta.')
            .bail()
            .isLength({min:3})
            .withMessage('El metodo debe tener mas de dos letras.'),
        body('garnish')
            .notEmpty()
            .withMessage('Agregar decoracón de la receta.')
            .bail()
            .isLength({min:3})
            .withMessage('La decoración debe tener mas de dos letras.'),
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
    recipeEdit: [
        body('name')
            .notEmpty()
            .withMessage('Agregar nombre de la receta.')
            .bail()
            .isLength({min:3, max:100})
            .withMessage('El nombre debe tener mas de dos letras.'),
        body('ingredients')
            .notEmpty()
            .withMessage('Agregar ingredientes.')
            .bail()
            .isLength({min:3})
            .withMessage('La descripcion debe tener mas de dos letras.'),
        body('method')
            .notEmpty()
            .withMessage('Agregar método de la receta.')
            .bail()
            .isLength({min:3})
            .withMessage('El metodo debe tener mas de dos letras.'),
        body('garnish')
            .notEmpty()
            .withMessage('Agregar decoracón de la receta.')
            .bail()
            .isLength({min:3})
            .withMessage('La decoración debe tener mas de dos letras.'),
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