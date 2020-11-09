const fs = require('fs');
const path = require('path');

const coursesFilePath = path.join(__dirname, '../data/coursesDB.json');
const coursesjson = () => {
    let jsonCourses = fs.readFileSync(coursesFilePath, 'utf-8');
    return JSON.parse(jsonCourses);
};

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

module.exports = {
    index : (req,res) => {
        let courses = coursesjson();
        res.render('./courses/courses', {courses, toThousand});
    },
    cart : (req,res) => {
        res.render('./products/productCart') // decidir si se usa el mismo carrito
    },
    detail: (req,res) => {
        let courses = coursesjson();
		let coursesDetail = courses.find(course=> 
            course.id == req.params.id	);
		res.render('./courses/coursesDetail', {'coursesDetail': coursesDetail, toThousand})
    },
    /*pagina para envio de una consulta sobre un curso, que deberia enviarse a la casilla del mail de quien lo dicta */
    consult: (req, res) => { 
        res.render('./courses/coursesContact');
    },
    /*redirecciion luego de enviar el formulario de consulta */
    redireccion: (req, res) => {
        res.render('./courses/coursesRedirect');
    },
    /*creacion de un curso*/
    new:  (req,res) => {
        res.render('./courses/courses-create-form')  //decidir si se crea un formulario ?????
    },
    create: (req, res, next) => {
        let courses = coursesjson();
        /*determina el id mayor en la base de datos, lo almacena y luego lo utiliza para evitar que se repita */
        let maxId = 0;
        for (let i=0; i<courses.length; i++) {
			if (maxId<courses[i].id) {
				maxId= courses[i].id;
            };
        };
        let newCourse = {
            id: (maxId + 1),
            ...req.body,
            image: "/" + req.file.filename
        };
        let newArray = [...courses, newCourse];
        newCourseJSON = JSON.stringify(newArray, null, ' ');
        fs.writeFileSync(coursesFilePath, newCourseJSON);
        res.redirect('/courses');
    },
    /*se busca y se muestra un curso para editar dentro de la base de datos */
    edit:  (req,res) => {
        let courses = coursesjson();
		let coursesDetail = courses.find(course=> 
			course.id == req.params.id) 
        res.render('./courses/courses-edit-form', {'coursesDetail': coursesDetail, toThousand});
    },
    /*se vuelve a mostrar la informacion del curso a editar y luego se almacenan los cambios realizados en el formulario */
    update: (req, res) => {
        let courses = coursesjson();
        for (i = 0; i<courses.length; i++) {
            if (courses[i].id == req.params.id) {
                 let course = {
                    id: courses[i].id,
                    ...req.body,
                    image: "/" + req.file.filename 
                }
                courses[i]=course;
            };
        };
        let newArray = [...courses];
        newArrayJSON = JSON.stringify(newArray, null, ' ');
        fs.writeFileSync(coursesFilePath, newArrayJSON);
        res.redirect('/courses');
    },
    /*borrado de un curso NO BORRA LA IMAGEN  */
    destroy: (req, res) => {
        let courses = coursesjson();
        let newArray = courses.filter(course => course.id != req.params.id)
        newArrayJSON = JSON.stringify(newArray, null, ' ');
        fs.writeFileSync(coursesFilePath, newArrayJSON);
        res.redirect('/courses');
    }
};