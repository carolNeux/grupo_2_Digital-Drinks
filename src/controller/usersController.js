const fs = require("fs");
const moment = require("moment");
const path = require("path");
const bcrypt = require("bcryptjs");
const { User, userCategory } = require("../database/models");
const {validationResult} = require('express-validator')

module.exports = {
    /*listado de usuarios para admins */
    list: async (req, res) => {
        try {
            let users = await User.findAll({include: {all: true}});
                for (let i = 0; i < users.length; i++) {
                    users[i].dataValues.birthday = moment(users[i].dataValues.birthday).format("DD-MM-YYYY");
                }
            res.render("./users/userList", {users});
        } catch (error) {
            console.log(error);
        }
    },
    //Registro de usuario
    showRegister: (req, res) => {
        res.render("./users/register");
    },
    usersRegister: async (req, res, next) => {
        let results = validationResult(req);
        if (results.isEmpty()) {
            try {
                const user = await User.create({
                    ...req.body,
                    password: bcrypt.hashSync(req.body.password, 10),
                    user_category_id: 2,
                });
                res.render("./users/registerRedirect", {user});
            } catch (error) {
                console.log(error);
            }
        } else {
            res.render('./users/register', {errors: results.errors})
        }
    },
    showLogin: (req, res) => {
        res.render("./users/login");
    },
    userLogin: async (req, res, next) => {
        let results = validationResult(req);
        if (results.isEmpty()) {
            try {
                let {username} = req.body;
                //buscamos en la base de datos el username
                let user = await User.findOne({
                    where: {
                        username: username,
                    },
                });
                if (user) {
                    //si el password es correcto almacenamos el nombre y la categoria del usuario es session
                    req.session.username = user.username;
                    req.session.userCategory = user.user_category_id;
                    if (req.body.rememberMe) {
                        //si el usuario marca el checkbox creamos una cookie
                        res.cookie('rememberMe', user.username, {maxAge : 1000 * 60 * 60});
                        res.cookie('rememberCategory', user.user_category_id, {maxAge : 1000 * 60 * 60});
                    }
                    res.render("./users/loginRedirect", {user});
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            res.render('./users/login', {errors: results.errors})
        }
    },
    logout: async (req, res) => {
        try {
            req.session.destroy();
            res.clearCookie('rememberMe');
            res.clearCookie('rememberCategory');
            res.redirect('/');
            
        } catch (error) {
            console.log(error);  
        }
    },
    edit: async (req, res) => {
        try {
            let editUser = await User.findByPk(req.params.id, {include: { all:true}});
            let category = await userCategory.findAll();
            res.render ('./users/userEdit', {editUser, category}) ;        
        } catch (error) {
            console.log(error);
        }
    },
    editStorage: async (req, res, next) => {
        let results = validationResult(req);
        let editUser
        let category
        try {
            let idUser = req.params.id;
            editUser = await User.findByPk(idUser);
            category = await userCategory.findAll();
        } catch (error) {
            console.log(error);
        }
        if (results.isEmpty()) {
            try {
                await editUser.update(req.body);
                res.render("./users/editRedirect");
            } catch (error) {
                console.log(error);
            }
        } else {
            res.render ('./users/userEdit', {editUser, category, errors: results.errors}) ; 
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