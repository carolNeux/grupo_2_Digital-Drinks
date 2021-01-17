const {Product, Category} = require('../../database/models');
const {Op} = require('sequelize');

/* Funcion que agrega un . para separar miles */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    /* Muestra todos los productos */
    index : async (req,res) => {
        try {
            const products = await Product.findAll({
                include: ['Category']
            });
            if (products.length >0) {
                let results = { 
                    metadata: {
                        status:200,
                        quantity: products.length
                    },
                    data: { products }
                }
                res.json(results)
            }
        } catch(error){
              res.render(error);
              console.log(error);
        }
    },
    detail: async (req,res) => {
        try {
            const {id} = req.params;
            const productDetail = await Product.findByPk(id, {
                include: ['Category']
            });   
            if(productDetail){
                let results = { 
                    metadata:{
                      status:200,
                     },
                     data:{ productDetail }
                }
            
            res.json(results)};
            
        } catch (error) {
            res.render(error);
            console.log(error); 
        }
    },
}