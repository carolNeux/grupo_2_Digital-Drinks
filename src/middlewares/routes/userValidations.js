const path = require('path');
const {User} = require('../../database/models');
const {body, check} = require ('express-validator');
const bcrypt = require('bcryptjs');
const { nextTick } = require('process');

module.exports = {
    userRegister: [
        body("first_name")
            .notEmpty()
            .withMessage('Debes ingresar tu nombre.')
            .bail()
            .isLength({min:3, max:50})
            .withMessage('El nombre debe tener mas de dos letras.')
            .bail()
            .custom(value => {
                let spacebar = value.replace(/\s+/g, '');
                let trim = /^[a-zA-Z\s]+$/.test(spacebar);
                return trim;
            })
            .withMessage('El nombre debe contener letras unicamente.'),
        body("last_name")
            .notEmpty()
            .withMessage('Debes ingresar tu apellido.')
            .bail()
            .isLength({min:3, max:50})
            .withMessage('El apellido debe tener mas de dos letras.')
            .bail()
            .custom(value => {
                let spacebar = value.replace(/\s+/g, '');
                let trim = /^[a-zA-Z\s]+$/.test(spacebar);
                return trim;
            })
            .withMessage('El apellido debe contener letras unicamente'),
        body("username")
            .notEmpty()
            .withMessage('Debes ingresar un nombre de usuario.')
            .bail()
            .isLength({min:3, max:50})
            .withMessage('El usuario debe tener mas de dos letras.')
            .bail()
            .isAlphanumeric()
            .withMessage('El nombre de usuario puede contener solo letras y números.')
            .bail()    
            .custom(async value => {
                let userUsername = await User.findOne({ 
                    where: {
                        'username': value 
                    }
                });
                  if (userUsername !== null) {
                    return Promise.reject();
                  }
            })
            .withMessage('Ese nombre de usuario ya existe.'),
        body("birthday")
            .notEmpty()
            .withMessage('Debes ingresar una fecha de nacimiento válida.')
            .bail()
            .custom (value => {
                let input = new Date(value);
                let actualDate = new Date ();
                let dayInput = (input.getDate()+1);
                let monthInput = (input.getMonth()+1);
                let yearInput = input.getFullYear(input);
                let dayActualDate = actualDate.getDate();
                let monthActualDate = (actualDate.getMonth(actualDate)+1);
                let yearActualDate = actualDate.getFullYear(actualDate);
                let result
                if ((yearActualDate - yearInput) <= 18) {
                    result = yearActualDate - yearInput;
                    if (monthActualDate <= monthInput) {
                        if (dayActualDate < dayInput) {
                            result = (yearActualDate - yearInput) -1
                            return (result >= 18);
                        } else {
                            return (result >= 18);
                        }
                    }
                    else {
                        return (yearActualDate - yearInput>= 18);
                    }
                } else {
                    return (yearActualDate - yearInput >= 18);
                } 
            })
            .withMessage('Debes ser mayor de 18 años para registrarte.'),
        body("email")
            .notEmpty()
            .withMessage("Debes completar este campo.")
            .bail()
            .isEmail()
            .withMessage("Debes ingresar una dirección de email válida.")
            .bail()
            .custom(async value => {
                let userEmail = await User.findOne({
                    where: {
                        'email': value
                    }
                })
                if (userEmail !== null) {
                    return Promise.reject();
                  }
            })
            .withMessage("El email ya se encuentra registrado."),
        body("password")
            .notEmpty()
            .withMessage("Debes ingresar una contraseña.")
            .bail()
            .isLength({min:6, max:12})
            .withMessage('La contraseña debe tener entre 6 y 12 caracteres.')
            .bail()
            .isAlphanumeric()
            .withMessage('La contraseña debe contener letras y números.')
            .bail()
    ],
    userEdit: [
        body("first_name")
            .notEmpty()
            .withMessage('Nombre no puede estar vacío.')
            .bail()
            .isLength({min:3, max:50})
            .withMessage('Más de 3 letras.')
            .bail()
            .custom(value => {
                let spacebar = value.replace(/\s+/g, '');
                let trim = /^[a-zA-Z\s]+$/.test(spacebar);
                return trim;
            })
            .withMessage('Solo letras.'),
        body("last_name")
            .notEmpty()
            .withMessage('Apellido no puede estar vacío.')
            .bail()
            .isLength({min:3, max:50})
            .withMessage('Más de 3 letras.')
            .bail()
            .custom(value => {
                let spacebar = value.replace(/\s+/g, '');
                let trim = /^[a-zA-Z\s]+$/.test(spacebar);
                return trim;
            })
            .withMessage('Solo letras.'),
        body("username")
            .notEmpty()
            .withMessage('User Name no puede estar vacío.')
            .bail()
            .isLength({min:3, max:50})
            .withMessage('Más de 3 letras.')
            .bail()
            .isAlphanumeric()
            .withMessage('Solo letras.')
            .bail()
            .custom(async value => {
                let userUsername = await User.findOne({ 
                    where: {
                        'username': value 
                    }
                });
                  if (userUsername !== null) {
                      if (userUsername.dataValues.username === value) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject();
                      }
                  }
            })
            .withMessage('Este username ya existe.'),
        body("birthday")
            .notEmpty()
            .withMessage('fecha de nacimiento no puede estar vacío.')
            .bail()
            .custom (function (value) {
                let input = new Date(value);
                let actualDate = new Date ();
                let dayInput = (input.getDate()+1);
                let monthInput = (input.getMonth()+1);
                let yearInput = input.getFullYear(input);
                let dayActualDate = actualDate.getDate();
                let monthActualDate = (actualDate.getMonth(actualDate)+1);
                let yearActualDate = actualDate.getFullYear(actualDate);
                let result
                if ((yearActualDate - yearInput) <= 18) {
                    result = yearActualDate - yearInput;
                    if (monthActualDate <= monthInput) {
                        if (dayActualDate < dayInput) {
                            result = (yearActualDate - yearInput) -1
                            return (result >= 18);
                        } else {
                            return (result >= 18);
                        }
                    }
                    else {
                        return (yearActualDate - yearInput>= 18);
                    }
                } else {
                    return (yearActualDate - yearInput >= 18);
                } 
            })
            .withMessage('No menores de 18'),
        body("email")
            .notEmpty()
            .withMessage("Email no puede estar vacío.")
            .bail()
            .isEmail()
            .withMessage("No es una dirección válida")
            .bail()
            .custom(async value => {
                let userEmail = await User.findOne({
                    where: {
                        'email': value
                    }
                })
                if (userEmail !== null) {
                    if (userEmail.dataValues.email === value) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject();
                    } 
                  }
            })
            .withMessage("El email ya se encuentra registrado.")
    ],
    userLogin: [
        body('username')
            .notEmpty()
            .withMessage('Debes ingresar tu nombre de usuario.')
            .bail()
            .custom(async value => {
                let userUsername = await User.findOne({ 
                    where: {
                        'username': value 
                    }
                });
                if (userUsername === null) {
                    return Promise.reject();
                }
            })
            .withMessage('El nombre de usuario es incorrecto.'),
        body('password')
            .notEmpty()
            .withMessage('Debes ingresar tu contraseña.')
            .bail()
            .custom(async function (value) {
                // bcrypt.compareSync(value, userPassword.dataValues.password)
                let userPassword = await User.findAll();
                let hasheo;
                for (let i = 0; i<userPassword.length; i++) {
                    if (bcrypt.compareSync(value, userPassword[i].dataValues.password)) {
                        hasheo = 1;
                    } 
                }   
                if (hasheo===1) {
                    return Promise.resolve();
                } else {
                    return Promise.reject();
                }
            })
            .withMessage('La contraseña es incorrecta.')
    ]
    
}