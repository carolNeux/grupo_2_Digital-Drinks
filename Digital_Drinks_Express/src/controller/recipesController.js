const fs = require('fs');
const path = require('path');

const recipesFilePath = path.join(__dirname, '../data/recipesDB.json');
const leerJson = ()=> JSON.parse(fs.readFileSync(recipesFilePath, 'utf-8'));

module.exports = {
    index : (req,res) => {
        let recipes = leerJson();
        res.render('./recipes/recipes', {recipes})
    },
    detail: (req,res) => {
        res.render('./recipes/recipesDetail') // crear recepiesDetail
    },
    create:  (req,res) => {
        res.render('./products/product-create-form') // decidir si se crea un formulario ????
    },
    edit:  (req,res) => {
        res.render('./products/product-edit-form') // decidir si se crea un formulario ?????
    }
}