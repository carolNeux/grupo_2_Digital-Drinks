const fs = require('fs');
const path = require('path');

const coursesFilePath = path.join(__dirname, '../data/coursesDB.json');
const courses = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

module.exports = {
    index : (req,res) => {
        res.render('./courses/courses', {courses, toThousand})
    },
    cart : (req,res) => {
        res.render('./products/productCart') // decidir si se usa el mismo carrito
    },
    detail: (req,res) => {
		let coursesDetail = courses.find(course=> 
            course.id == req.params.id	);
		res.render('./courses/coursesDetail', {'coursesDetail': coursesDetail, toThousand})
    },
    create:  (req,res) => {
        res.render('./products/product-create-form')  //decidir si se crea un formulario ?????
    },
    edit:  (req,res) => {
        res.render('./products/product-edit-form') //decidir si se crea un formulario ?????
    },
    consult: (req, res) => {
        res.render('./courses/coursesContact');
    },
    redireccion: (req, res) => {
        res.render('./courses/coursesRedirect');
    }
}