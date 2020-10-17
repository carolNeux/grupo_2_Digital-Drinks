const fs = require('fs');
const path = require('path');

const recepiesFilePath = path.join(__dirname, '../data/recepiesDB.json');
const leerJson = ()=> JSON.parse(fs.readFileSync(recepiesFilePath, 'utf-8'));

module.exports = {
    index : (req,res) => {
        let recepies = leerJson();
        res.render('./recepies/recepies', {recepies})
    },
    detail: (req,res) => {
        res.render('./recepies/recepiesDetail') // crear recepiesDetail
    },
    create:  (req,res) => {
        res.render('./products/product-create-form') // decidir si se crea un formulario ????
    },
    edit:  (req,res) => {
        res.render('./products/product-edit-form') // decidir si se crea un formulario ?????
    }
}