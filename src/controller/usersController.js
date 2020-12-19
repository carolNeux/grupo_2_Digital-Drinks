const fs = require("fs");
const moment = require("moment");
const path = require("path");
const bcrypt = require("bcryptjs");
const {
    User,
    userCategory
} = require("../database/models");
const {
    validationResult
} = require('express-validator');

const usersFilePath = path.join(__dirname, "../data/usersDB.json");
const leerjson = () => {
    let jsonUsers = fs.readFileSync(usersFilePath, "utf-8");
    return JSON.parse(jsonUsers);
};
module.exports = {
    /*listado de usuarios para admins */
    list: async (req, res) => {
        try {
            //hay que arreglar la vista de la categoria de usuario que no se muestra.
            let users = await User.findAll({
                include: {
                    all: true
                }
            });
            for (let i = 0; i < users.length; i++) {
                users[i].dataValues.birthday = moment(
                    users[i].dataValues.birthday
                ).format("DD-MM-YYYY");
            }
            res.render("./users/userList", {
                users
            });
        } catch (error) {
            console.log(error);
        }
    },
    //Registro de usuario
    showRegister: (req, res) => {
        res.render("./users/register");
    },
    usersRegister: async (req, res) => {
        try {
            const user = await User.create({
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
                user_category_id: 2,
            });
            res.render("./users/registerRedirect", {
                user
            });
        } catch (error) {
            console.log(error);
            res.render("./users/errorRegister");
        }
    },
    showLogin: (req, res) => {
        res.render("./users/login");
    },
    userLogin: async (req, res) => {
        try {
            let {username, password} = req.body;
            let user = await User.findOne({
                where: {
                    username: username,
                },
            });
            if (user) {
                const validPassword = await bcrypt.compare(password, user.password);
                if (validPassword) {
                    res.render("./users/loginRedirect", {user});
                } else {
                    res.render("./users/errorLogin");
                }
            }
        } catch (error) {
            console.log(error);
        }
    },
    edit: async (req, res) => {
        try {
            let editUser = await User.findByPk(req.params.id, {
                include: {
                    all: true
                },
            });
            let category = await userCategory.findAll();
            res.render("./users/userEdit", {
                editUser,
                category
            });
        } catch (error) {
            console.log(error);
        }
    },
    editStorage: async (req, res) => {
        try {
            let idUser = req.params.id;
            editUsers = await User.findByPk(idUser);
            await editUsers.update(req.body);
            res.render("./users/editRedirect");
        } catch (error) {
            console.log(error);
        }
    },
    /*borrado de un usuario con redireccion */
    delete: async (req, res) => {
        try {
            let idUser = req.params.id;
            let deleteUsers = await User.findByPk(idUser);
            await deleteUsers.destroy();
            res.render("./users/destroyRedirect");
        } catch (error) {
            console.log(error);
        }
    },
};