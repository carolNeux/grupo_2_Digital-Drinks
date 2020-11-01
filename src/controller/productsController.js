const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const getProducts = () => JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {

    index : (req,res) => {
        let products = getProducts()
        res.render('./products/products', { products, toThousand })
    },
    cart : (req,res) => {
        let products = getProducts()
        res.render('./products/productsCart')
    },
    detail: (req,res) => {
        let products = getProducts()
		let id = req.params.id;
		let productDetail = products.find(product => product.id == id);
		
		res.render('./products/productDetail', {'productDetail': productDetail, toThousand});
    },
    new:  (req,res) => {
        let products = getProducts()
        res.render('./products/product-create-form')
    },
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
    edit:  (req,res) => {
        let products = getProducts()
        let idProduct = req.params.id;
		let productDetail = products.find(product=> 
			product.id == idProduct	);
        res.render('./products/product-edit-form', {'productDetail': productDetail, toThousand});
    },
    update: (req, res, next) => {
        let products = getProducts();
        let id = parseInt(req.params.id);
        let product = products.find(product => product.id === id);
        updatedProduct = { 
            ...product, 
            ...req.body, 
            id, 
            image: req.file.filename
         }
        console.log('producto actualizado: ', updatedProduct)
        res.redirect('/products');
    }
}