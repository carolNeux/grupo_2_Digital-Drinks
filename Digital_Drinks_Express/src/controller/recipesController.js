const fs = require('fs');
const path = require('path');
const {update} = require('./productsController');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const recipesFilePath = path.join(__dirname, '../data/recipesDB.json');
const recipes = JSON.parse(fs.readFileSync(recipesFilePath, {encoding: 'utf-8'}));

module.exports = {
    index : (req,res) => {
        res.render('./recipes/recipes', {recipes})
    },
    detail: (req,res) => {
        let idDetail = req.params.id;
		let recipeDetail = recipes.find(recipe=> 
			recipe.id == idDetail); 
        res.render('./recipes/recipesDetail', {'recipeDetail': recipeDetail, toThousand});
    },
    create:  (req,res) => {
        res.render('./recipes/recipes-create-form') // decidir si se crea un formulario ????
    },
    store: (req, res, next) => {
        res.redirect('/recipes');
    },
    edit:  (req,res) => {
        let idDetail = req.params.id;
		let recipeDetail = recipes.find(recipe=> 
			recipe.id == idDetail); 
        res.render('./recipes/recipes-edit-form.ejs', {'recipeDetail': recipeDetail, toThousand}) // Buscar y enviar el producto a editar a la vista
    },
    update: (req, res, next) => {
        res.send('vamos por ahi')
    },
    delete: (req, res, next) => {
        res.send('salio!!!!')
    }
}