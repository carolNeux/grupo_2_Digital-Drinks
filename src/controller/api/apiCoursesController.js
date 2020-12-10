const {Course} = require('../../database/models');
const {Op} = require('sequelize');

/* Funcion que agrega un . para separar miles */
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    /* Muestra todos los productos */
    index : async (req,res) => {
        try{
            const courses = await Course.findAll(
                );
                if(courses.length >0){
                        let results = { 
                            metadata:{
                              status:200,
                              quantity: courses.length
                             },
                             data:{
                               courses
                            }
                        }
                    res.json(results)}
        } catch(error){
              res.render(error);
              console.log(error);
        }
    },
    detail: async (req,res) => {
        try {
            const {id} = req.params;
            const courseDetail = await Course.findByPk(id);   
            if(courseDetail){
                let results = { 
                    metadata:{
                      status:200,
                     },
                     data:{
                       courseDetail
                    }
                }
            
            res.json(results)};
            
        } catch (error) {
            res.render(error);
            console.log(error); 
        }
    },
}
