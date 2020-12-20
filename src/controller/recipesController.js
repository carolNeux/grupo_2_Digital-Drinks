const {Recipe} = require('../database/models');
const {Op} = require('sequelize');
const { body } = require('express-validator');

module.exports = {

    index : async (req,res) => {
       try{
           const recipes = await Recipe.findAll();
             res.render('./recipes/recipes', {recipes})
            } catch(error) {
                console.log(error);
             }     
    },
    /*  COMIENZA DETAIL **/ 

    detail : async(req,res) => {
        try{
            const recipeDetail = await Recipe.findByPk(req.params.id)
            res.render('./recipes/recipesDetail', {recipeDetail})
            } catch(error) {
                 console.log(error);
             } 
     },

     /*****MOSTRANDO EL FORMULARIO de creacion */
        
    new: async (req, res) => {
        try {
                res.render('./recipes/recipesCreateForm')   
        } catch (error) {
            console.log(error);
        }
    } ,

    /*****   Creamos  */
    create: async(req,res)=>{
        try{    
          const newRecipe = await Recipe.create({
              ...req.body, 
              image:req.file.filename
          });
           
           res.redirect('/recipes')

           }catch(error) {
           console.log(error)
           } 
     },

    /**fin create nuevo 
 
    /**muestra el form para editar */
    edit: async (req,res) => {
        try {
                const recipeId = req.params.id;
                const recipeDetail =await Recipe.findByPk(recipeId);
                res.render('./recipes/recipesEditForm', {'recipeDetail': recipeDetail}) // Buscar y enviar el producto a editar a la vista    
                } catch(error) {
                console.log(error)
                } 
    },
    /* Recibe el formulario de edicion actualiza la base de datos y lista las recetas actualizados */
    update: async(req,res)=>{
        try { 
            
         const recipeId = req.params.id;
         const recipeToEdit = await Recipe.findByPk(recipeId);
            if (req.body.image == undefined) {
                //si viene indefinido el campo de imagen, almacena la misma imagen que ya tenia
                await recipeToEdit.update({
                    ...req.body, 
                    image:Recipe.image  
                 });
                res.redirect('/recipes');
            } else {
                //si viene una nueva imagen en la edicion, se almacena la nueva imagen
                await recipeToEdit.update({
                    ...req.body, 
                    image:req.file.filename  
                 });
                res.redirect('/recipes');
            }
        } catch(error) {
        console.log(error)
       }
    },
     
    delete: async(req, res) => {
        try {              
                const recipeId = req.params.id; 
                const recipeToDelete = await Recipe.findByPk(recipeId);
                await recipeToDelete.destroy();    
                res.redirect('/recipes');      

       } catch (error) {
        console.log(error)  
       }
       
    },

    search: async(req,res)=>{
        try {
            let {search} = req.query;
            let recipes = await Recipe.findAll(
               { where:{
                   name:{
                       [Op.like]: '%' + search + '%'
                   }
               }
            });
            res.render('./recipes/search', {recipes})
            
        } catch (error) {
            console.log(error)     
        }
    }

    }
