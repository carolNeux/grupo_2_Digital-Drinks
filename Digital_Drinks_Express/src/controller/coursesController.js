const fs = require('fs');
const path = require('path');

const coursesFilePath = path.join(__dirname, '../data/coursesDB.json');
const leerJson = ()=> JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

module.exports = {
    index : (req,res) => {
        let courses = leerJson();
        res.render('./courses/courses', {courses, toThousand})
    },
    cart : (req,res) => {
        res.render('./products/productCart') // decidir si se usa el mismo carrito
    },
    detail: (req,res) => {
        res.render('./courses/coursesDetail')  // crear courses detail
    },
    create:  (req,res) => {
        res.render('./products/product-create-form')  //decidir si se crea un formulario ?????
    },
    edit:  (req,res) => {
        res.render('./products/product-edit-form') //decidir si se crea un formulario ?????
    }
}