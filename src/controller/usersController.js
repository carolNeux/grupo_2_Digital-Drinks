const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersFilePath = path.join(__dirname, '../data/usersDB.json');
const leerjson = () => {
    let jsonUsers = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(jsonUsers);
};
module.exports = {
    /*listado de usuarios para admins */
    list: (req, res) => {
        let users = leerjson()
        res.render('./users/userList', {users})
    },
    //Registro de usuario
    showRegister: (req,res) => {
        res.render('./users/register');
    },
    usersRegister: (req, res) => {
        let users = leerjson();
        //Para evitar repetir id de usuarios
        let maxId = 0;
        for (let i=0; i<users.length; i++) {
			if (maxId<users[i].id) {
				maxId= users[i].id;
            };
        };
        //Para determinar si existen ya el usuario y el email a registrar
        let userCount = 0;
        for (let i=0; i<users.length; i++) {
            if (req.body.username == users[i].username || req.body.email == users[i].email) {
                userCount = + 1;
            }
        };
        //para guardar el usuario en el json si no existe uno igual con email o username
        if (userCount == 0) {
        let newUser = {
            id: (maxId + 1),
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            category: "user"
        };
        let userData = req.body.username;
        /* dos formas de guardar usuarios en el json*/
        //----------------------------------------
        //1- agrega al final el nuevo usuario
        // users.push(newUser);
		// let usersJSON = JSON.stringify(users, null, ' ');
        // fs.writeFileSync(usersFilePath , usersJSON);
        //----------------------------------------------- 
        //2- sobreescribe la db con los datos agregados del nuevo usuario
        let newArray = [...users, newUser];
        newArrayJSON = JSON.stringify(newArray, null, ' ');
        fs.writeFileSync(usersFilePath, newArrayJSON);

        //redireccion a la bienvenida
        res.render('./users/registerRedirect', {'userData': userData});
        } else {
            res.render('./users/errorRegister')
        }
    },
    showLogin: (req,res) => {
        res.render('./users/login');
    },
    userLogin: (req, res) => {
        let users = leerjson();
        let loginUser;
        for (let i = 0; i<users.length; i++) {
            if (users[i].username == req.body.username && bcrypt.compareSync(req.body.password, users[i].password)) {
                loginUser=req.body.username;
                res.render ('./users/loginRedirect', {'loginUser': loginUser});
            }
        };
        res.render('./users/errorLogin')
    },
    edit: (req, res) => {
        let users = leerjson();
        let editUser = users.find(user => user.id==req.params.id);
        res.render ('./users/userEdit', {editUser})
    },
    editStorage: (req, res) => {
        let users = leerjson();
        for (i = 0; i<users.length; i++) {
            if (users[i].id == req.params.id) {
                 let user = {
                    id: users[i].id,
                    ...req.body
                }
                users[i]=user;
            };
        };
        let newArray = [...users];
        newArrayJSON = JSON.stringify(newArray, null, ' ');
        fs.writeFileSync(usersFilePath, newArrayJSON);
        res.render ('./users/editRedirect')
    },
    /*borrado de un usuario con redireccion */
    delete: (req, res) => {
        let users = leerjson();
        let newArray = users.filter(user => user.id != req.params.id)
        newArrayJSON = JSON.stringify(newArray, null, ' ');
        fs.writeFileSync(usersFilePath, newArrayJSON);
        res.render('./users/destroyRedirect')
    }
}