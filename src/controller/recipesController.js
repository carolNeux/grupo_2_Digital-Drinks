const fs = require('fs');
const path = require('path');
const {update} = require('./productsController');
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const recipesFilePath = path.join(__dirname, '../data/recipesDB.json');
const getRecipes = ()=> JSON.parse(fs.readFileSync(recipesFilePath, {encoding: 'utf-8'}));

module.exports = {
    index : (req,res) => {
        let recipes = getRecipes();
        res.render('./recipes/recipes', {recipes})
    },
    detail: (req,res) => {
        let recipes = getRecipes();
        let idDetail = req.params.id;
		let recipeDetail = recipes.find(recipe=> 
			recipe.id == idDetail); 
        res.render('./recipes/recipesDetail', {'recipeDetail': recipeDetail});
    },
    new:  (req,res) => {
        let recipes = getRecipes();
        res.render('./recipes/recipes-create-form')
    },
    create: (req, res, next) => {
        let recipes = getRecipes();
        let newRecipe = {
            id: recipes[recipes.length -1].id + 1,
            ...req.body,
            image: req.file.filename,
        };
        let newDb = JSON.stringify(
            [...recipes, newRecipe], null, 2
        );
        fs.writeFileSync(recipesFilePath, newDb);
        res.redirect('/recipes');
    },
    edit:  (req,res) => {
        let recipes = getRecipes();
        let idDetail = req.params.id;
		let recipeDetail = recipes.find(recipe=> 
			recipe.id == idDetail); 
        res.render('./recipes/recipes-edit-form.ejs', {'recipeDetail': recipeDetail, toThousand}) // Buscar y enviar el producto a editar a la vista
    },
    update: (req, res, next) => {
        let recipes = getRecipes();
        res.render('/recipes')
    }
}