const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

let usersController = require("../controller/usersController");

/* GET users listing. */
router.get("/list", usersController.list);

/*register*/
router.get("/register", usersController.showRegister);
router.post("/register", usersController.usersRegister);

/* login*/
router.get("/login", usersController.showLogin);
router.post("/login",usersController.userLogin);

/*edicion de un usuario */
router.get("/edit/:id", usersController.edit);
router.put("/edit/:id", usersController.editStorage);

/*borrado de un usuario */
router.delete("/delete/:id", usersController.delete);

module.exports = router;
