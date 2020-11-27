const {Product, Category} = require('../database/models');
const {Op} = require('sequelize');

/* Funcion que agrega un . para separar miles */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    /* Muestra todos los productos */
    index : async (req,res) => {
        try{
            const products = await Product.findAll({
                    include: ['Category']
                });
            res.render('./products/products', { products, toThousand })
        } catch(error){
            res.render(error);
            console.log(error);
        }
    },
      /* Muestra el carrito */
    cart : async (req,res) => {
        try {
            const products = await Product.findAll(
                {
                    include: ['Category']
                });
            res.render('./products/productsCart')
            
        } catch (error) {
            res.render(error);
            console.log(error);
        }
    },
      /* Muestra el detalle de un producto */
    detail: async (req,res) => {
        try {
            const {id} = req.params;
            const productDetail = await Product.findByPk(id, {
                include: ['Category']
            });          
            res.render('./products/productDetail', {'productDetail': productDetail, toThousand});
            
        } catch (error) {
            res.render(error);
            console.log(error); 
        }
    },
      /* Muestra el formulario para crear un producto */
    new: async (req,res) => {
        try {
            const categories = await Category.findAll();
            res.render('./products/productCreateForm', {categories});          
        } catch (error) {
            res.render(error);
            console.log(error);
        }
    },  
     /* Recibe el formulario de creacion actualiza la base de datos y lista los productos actualizados */
    create: async (req, res, next) => {
        try {
            await Product.create({
                ...req.body,
                image : req.file.filename
            });
            console.log('producto creado')
            res.redirect('/products');
            
        } catch (error) {
            res.render(error);
            console.log(error);
        }
    },  
     /* Muestra el formulario de edicion con los valores que ya trae el producto */
    edit: async (req,res) => {
        try {
            const {id} = req.params;
            const productDetail = await Product.findByPk(id, {
                include: ['Category']
            });
            const categories = await Category.findAll();
            res.render('./products/productEditForm', {productDetail, toThousand, categories});
            // console.log(categories);
            // res.json(categories);
            
        } catch (error) {
            res.render(error);
            console.log(error);
        }
    },
    /* Recibe el formulario de edicion actualiza la base de datos y lista los productos actualizados */
    update: async (req, res, next) => {
        try {
            const {id} = req.params;
            const product = await Product.findByPk(id, {
                include: ['Category']
            });
            await product.update({
                ...req.body,
                image: req.file.filename
            })
            res.redirect('/products')
            
        } catch (error) {
            res.render(error);
            console.log(error);
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