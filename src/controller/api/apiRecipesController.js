const {Recipe} = require('../../database/models');
const {Op} = require('sequelize');

/* Funcion que agrega un . para separar miles */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    /* Muestra todos los productos */
    index : async (req,res) => {
        try{
            const recipes = await Recipe.findAll(
                );
                if(recipes.length >0){
                        let results = { 
                            metadata:{
                              status:200,
                              quantity: recipes.length
                             },
                             data:{
                               recipes
                            }
                        }
                    res.json(results)}
        } catch(error){
              res.render(error);
              console.log(error);
        }
    },
    detail: async (req,res) => {
        try {
            const {id} = req.params;
            const recipesDetail = await Recipe.findByPk(id);   
            if(recipesDetail){
                let results = { 
                    metadata:{
                      status:200,
                     },
                     data:{
                       recipesDetail
                    }
                }
            
            res.json(results)};
            
        } catch (error) {
            res.render(error);
            console.log(error); 
        }
    },
}
