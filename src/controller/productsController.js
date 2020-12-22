const {Product, Category} = require('../database/models');
const {Op} = require('sequelize');
const {validationResult} = require('express-validator')
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    /* Muestra todos los productos */
    index : async (req,res) => {
        try{
            const products = await Product.findAll({include: ['Category']});
            res.render('./products/products', { products, toThousand });
        } catch(error){
            console.log(error);
        }
    },
      /* Muestra el carrito */
    cart : async (req,res) => {
        try {
            const products = await Product.findAll({ include: ['Category']});
            res.render('./products/productsCart');   
        } catch (error) {
            console.log(error);
        }
    },
      /* Muestra el detalle de un producto */
    detail: async (req,res) => {
        try {
            const {id} = req.params;
            const productDetail = await Product.findByPk(id, {include: ['Category']});          
            res.render('./products/productDetail', {productDetail, toThousand});
            
        } catch (error) {
            console.log(error); 
        }
    },
      /* Muestra el formulario para crear un producto */
    new: async (req,res) => {
        try {                
            const categories = await Category.findAll();
            res.render('./products/productCreateForm', {categories});          
            }
        catch(error) {
            console.log(error);
        }
    },  
     /* Recibe el formulario de creacion actualiza la base de datos y lista los productos actualizados */
    create: async (req, res, next) => {
        let results = validationResult(req);
        if (results.isEmpty())
        {
            try {
                await Product.create({
                    ...req.body,
                    image : req.file.filename
                });
                res.redirect('/products');
                
            } catch (error) {
                console.log(error);
            }
        } else {
            res.render('./products/productCreateForm', {errors: results.errors});
        }
    },  
     /* Muestra el formulario de edicion con los valores que ya trae el producto */
    edit: async (req,res) => {
        try {           
            const { id } = req.params;
            const productDetail = await Product.findByPk(id, {
                include: ['Category']
            });
            const categories = await Category.findAll();
            res.render('./products/productEditForm', { productDetail, toThousand, categories });

        }catch(error) {
            console.log(error);
        }
    },
    /* Recibe el formulario de edicion actualiza la base de datos y lista los productos actualizados */
    update: async (req, res, next) => {
        let results = validationResult(req);
        let productDetail
        try {
            const {id} = req.params;
            productDetail = await Product.findByPk(id, {include: ['Category']});
            
        } catch (error) {
            console.log(error);
        }
        if (results.isEmpty()) {
            try {
                const {id} = req.params;
                const product = await Product.findByPk(id, {include: ['Category']});
                if (req.body.image == undefined) {
                    //si viene indefinido el campo de imagen, almacena la misma imagen que ya tenia
                    await product.update({
                        ...req.body,
                        image: product.image
                    })
                    res.redirect('/products')                    
                } else {
                    //si viene una nueva imagen en la edicion, se almacena la nueva imagen
                    await product.update({
                        ...req.body,
                        image: req.file.filename
                    })
                    res.redirect('/products')
                }
                
            } catch (error) {
                res.render(error);
                console.log(error);
            }
        } else {
            res.render('./products/productEditForm', {errors: results.errors});
        }
    },
    /* Elimina un producto actualiza la base de datos y redirecciona a la lista de productos actualizada */
    delete: async (req, res) => {
        try {
                const {id} = req.params;
                const product = await Product.findByPk(id);
                await product.destroy();
                res.redirect('/products');
        } catch (error) {
            res.render(error);
            console.log(error); 
        }
    },
    search: async(req, res) => {
        try {
            let {search} = req.query;
            let products = await Product.findAll({
                where: {
                    name: {[Op.like] : '%' + search + '%'}
                }
            });
            res.render('./products/productsSearch', {products, toThousand});
        } catch (error) {
            res.render(error);
            console.log(error);
        }
    }
}