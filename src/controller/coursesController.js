const {Course} = require("../database/models");
const{Op} = require("sequelize");


const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")

module.exports = {
    index :async (req,res) => {
        try {
        let courses = await Course.findAll();
        res.render('./courses/courses', {courses, toThousand});
        } catch (error){
            console.log(error);
        }
    },
    detail:async (req,res) => {
        try {
        let courses = await Course.findAll();
		let coursesDetail = await courses.find(course=> 
            course.id == req.params.id	);
		res.render('./courses/coursesDetail', {'coursesDetail': coursesDetail, toThousand})
    } catch (erorr){
        console.log(error);
    }
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
        res.render('./courses/coursesCreateForm')  //decidir si se crea un formulario ?????
    },
    create: async (req,res) => {
        try {
            await Course.create({
                ...req.body,
                image: req.file.filename
            })
            res.redirect('/courses');
        } catch (error) {
            console.log(error);
        }
    },
    /*se busca y se muestra un curso para editar dentro de la base de datos */
    edit: async (req,res) => {
        try {
        let courses = await Course.findAll();
		let coursesDetail = await courses.find(course=> 
			course.id == req.params.id) 
        res.render('./courses/coursesEditForm', {'coursesDetail': coursesDetail, toThousand});
    } catch (error){
        console.log(error);
    } 
},
    /*se vuelve a mostrar la informacion del curso a editar y luego se almacenan los cambios realizados en el formulario */
    update: async (req, res) =>{
        try {
            let id = req.params.id;
            let course = await Course.findByPk(id);
            await course.update({
                ...req.body,
                image : req.file.filename
            })
            res.redirect('/courses');
        } catch (error) {
            console.log(error);
            
        }
    }, 
    search : async (req,res) => {
        try {
            let search = req.query.search;  
            let courses = await Course.findAll({
                where: {
                    name: {
                        [Op.like]: '%' + search + '%'
                    }
                }
            });
            res.render('./courses/coursesSearch', {courses, toThousand});
        } catch (error) {
            console.log(error);
        }
    },

    /*borrado de un curso NO BORRA LA IMAGEN  */
    destroy: async (req,res) => {
        try {
            let id = req.params.id;
            let course = await Course.findByPk(id);
            await course.destroy();
            res.redirect('/courses');          
        } catch (error) {
            console.log(error);
            
        }
    }
};