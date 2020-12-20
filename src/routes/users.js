const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

let usersController = require("../controller/usersController");
const allowed = require('../middlewares/routes/allowed');

/* GET users listing. */
router.get("/list", allowed, usersController.list);

/*register*/
router.get("/register", usersController.showRegister);
router.post("/register", usersController.usersRegister);

/* login*/
router.get("/login", usersController.showLogin);
router.post("/login", usersController.userLogin);

/* logout */
router.get("/logout", usersController.logout)
// router.post("/logout", usersController.logout)

/*edicion de un usuario */
router.get("/edit/:id", allowed, usersController.edit);
router.put("/edit/:id", allowed, usersController.editStorage);

/*borrado de un usuario */
router.delete("/delete/:id", allowed, usersController.delete);

module.exports = router;
