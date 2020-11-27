const {Product, Category} = require('../database/models');
const {Op} = require('sequelize');
// const fs = require('fs');
// const path = require('path');

// const productsFilePath = path.join(__dirname, '../data/productsDB.json');
/* Funcion que lee la base de datos */
// const getProducts = () => JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));
/* Funcion que agrega un . para separar miles */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    /* Muestra todos los productos */
    index : async (req,res) => {
        try{
            const products = await Product.findAll(
                {include: ['Categories']}
            );
            res.json(products);
            // let products = getProducts()
            // res.render('./products/products', { products, toThousand })
        } catch(error){
            res.json(error);
            console.log(error);
        }
    },
      /* Muestra el carrito */
    cart : (req,res) => {
        let products = getProducts()
        res.render('./products/productsCart')
    },
      /* Muestra el detalle de un producto */
    detail: (req,res) => {
        let products = getProducts()
		let id = req.params.id;
		let productDetail = products.find(product => product.id == id);
		
		res.render('./products/productDetail', {'productDetail': productDetail, toThousand});
    },
      /* Muestra el formulario para crear un producto */
    new:  (req,res) => {
        let products = getProducts()
        res.render('./products/productCreateForm')
    },  
     /* Recibe el formulario de creacion actualiza la base de datos y lista los productos actualizados */
    create: (req, res, next) => {
        let products = getProducts();
        let newProduct = {
            id: products[products.length -1].id + 1,
            ...req.body,
            image: req.file.filename
        };
        console.log('producto creado', newProduct)
        let newDb = JSON.stringify([...products, newProduct], null, 2);
        fs.writeFileSync(productsFilePath, newDb);

		res.redirect('/products');
    },  
     /* Muestra el formulario de edicion con los valores que ya trae el producto */
    edit:  (req,res) => {
        let products = getProducts()
        let idProduct = req.params.id;
		let productDetail = products.find(product=> 
			product.id == idProduct	);
        res.render('./products/productEditForm', {'productDetail': productDetail, toThousand});
    },
    /* Recibe el formulario de edicion actualiza la base de datos y lista los productos actualizados */
    update: (req, res, next) => {
        let products = getProducts();
        for (i = 0; i<products.length; i++) {
            if (products[i].id == req.params.id) {
                 let product = {
                    id: products[i].id,
                    ...req.body,
                    image: req.file.filename
                }
                products[i]=product;
            };
        };
        let newProduct = [...products];
        let newProductJSON = JSON.stringify(newProduct, null, 2);
        fs.writeFileSync(productsFilePath, newProductJSON);
        res.redirect('/products')
    },
    /* Elimina un producto actualiza la base de datos y redirecciona a la lista de productos actualizada */
    delete: (req, res) => {
        let products = getProducts();
        let newDb = products.filter(product => product.id != req.params.id)
        newDbJson = JSON.stringify(newDb, null, ' ');
        fs.writeFileSync(productsFilePath, newDbJson);
        res.redirect('/products');
    }
}