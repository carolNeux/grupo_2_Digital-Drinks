const fs = require('fs');
const path = require('path');

const coursesFilePath = path.join(__dirname, '../data/coursesDB.json');
const courses = JSON.parse(fs.readFileSync(coursesFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

module.exports = {
    index : (req,res) => {
        res.render('./courses/courses', {courses, toThousand});
    },
    cart : (req,res) => {
        res.render('./products/productCart') // decidir si se usa el mismo carrito
    },
    detail: (req,res) => {
		let coursesDetail = courses.find(course=> 
            course.id == req.params.id	);
		res.render('./courses/coursesDetail', {'coursesDetail': coursesDetail, toThousand})
    },
    consult: (req, res) => { 
        res.render('./courses/coursesContact');
    },
    redireccion: (req, res) => {
        res.render('./courses/coursesRedirect');
    },
    new:  (req,res) => {
        res.render('./courses/courses-create-form')  //decidir si se crea un formulario ?????
    },
    create: (req, res, next) => {
        res.redirect('/courses');
    },
    edit:  (req,res) => {
		let coursesDetail = courses.find(course=> 
			course.id == req.params.id) 
        res.render('./courses/courses-edit-form', {'coursesDetail': coursesDetail, toThousand});
    },
    update: (req, res, next) => {
        res.redirect('/courses');
    }
};