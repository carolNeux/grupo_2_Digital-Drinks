const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, {encoding: 'utf-8'}));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {

    index : (req,res) => {
        res.render('./products/products', { products , toThousand })
    },
    cart : (req,res) => {
        res.render('./products/productsCart')
    },
    detail: (req,res) => {
		let idProduct = req.params.id;
		let productDetail = products.find(product=> 
			product.id == idProduct	);
		
		res.render('./products/productDetail', {'productDetail': productDetail, toThousand});
    },
    create:  (req,res) => {
        res.render('./products/product-create-form')
    },
    store: (req, res, next) => {
		res.redirect('/products');
    },
    edit:  (req,res) => {
        let idProduct = req.params.id;
		let productDetail = products.find(product=> 
			product.id == idProduct	) 
        res.render('./products/product-edit-form', {'productDetail': productDetail, toThousand});
    },
    update: (req, res, next) => {
        res.redirect('/products');
    },
    delete: (req, res) => {
        res.redirect('/products')
    }
}