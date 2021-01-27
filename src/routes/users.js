const express = require("express");
const router = express.Router();
const usersController = require("../controller/usersController");
const allowed = require('../middlewares/routes/allowed');
const userValidations = require('../middlewares/routes/userValidations');

/* GET users listing. */
router.get("/list", allowed, usersController.list);

/*register*/
router.get("/register", usersController.showRegister);
router.post("/register",userValidations.userRegister, usersController.usersRegister);

/* login*/
router.get("/login", usersController.showLogin);
router.post("/login",userValidations.userLogin, usersController.userLogin);

/* logout */
router.get("/logout", usersController.logout)

/*Perfil del usuario*/
router.get("/account", usersController.account)

/*edicion por parte del usuario */
router.get("/accountEdit/:id", allowed, usersController.accountEdit);
router.put("/accountEdit/:id", allowed, userValidations.userEditAccount, usersController.accountStorage);

/*edicion de un usuario */
router.get("/edit/:id", allowed, usersController.edit);
router.put("/edit/:id", allowed, userValidations.userEdit, usersController.editStorage);

/*borrado de un usuario por admins*/
router.delete("/delete/:id", allowed, usersController.delete);


module.exports = router;
