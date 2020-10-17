const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const leerJson = ()=> JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {

    index : (req,res) => {
        let products = leerJson();
        res.render('./products/products', { products , toThousand })
    },
    cart : (req,res) => {
        res.render('./products/productCart')
    },
    detail: (req,res) => {

        let products = leerJson();
		let idProduct = req.params.id;
		let productDetail = products.find(product=> 
			product.id == idProduct	) 
		
		res.render('./products/productDetail', {'productDetail': productDetail, toThousand})
    },
    create:  (req,res) => {
        res.render('./products/product-create-form')
    },
    edit:  (req,res) => {
        res.render('./products/product-edit-form')
    }
}