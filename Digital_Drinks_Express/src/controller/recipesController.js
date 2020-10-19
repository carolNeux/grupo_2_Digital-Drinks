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
        res.render('./product-create-form') // decidir si se crea un formulario ????
    },
    edit:  (req,res) => {
        res.send('vamos por ahi') // decidir si se crea un formulario ?????
    },
    update: (req, res, next) => {
        res.send('vamos por ahi')
    },
    delete: (req, res, next) => {
        res.send('salio!!!!')
    }
}