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
        res.render('./recipes/recipesCreateForm')
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
        res.render('./recipes/recipesEditForm.ejs', {'recipeDetail': recipeDetail, toThousand}) // Buscar y enviar el producto a editar a la vista
    },
    /* Recibe el formulario de edicion actualiza la base de datos y lista las recetas actualizados */
    update: (req, res, next) => {
        let recipes = getRecipes();
        let id = parseInt(req.params.id);
        let recipe = recipes.find(recipe => recipe.id === id);
        updatedrecipe = { 
            ...recipe, 
            ...req.body, 
            id, 
            image: req.file.filename
         }
        res.redirect('/recipes');
    },
    /* Elimina una receta actualiza la base de datos y redirecciona a la lista de recetas actualizada */
    delete: (req, res) => {
        let recipes = getRecipes();
        let newDb = recipes.filter(recipe => recipe.id != req.params.id)
        newDbJson = JSON.stringify(newDb, null, ' ');
        fs.writeFileSync(recipesFilePath, newDbJson);
        res.redirect('/recipes');
    }
}