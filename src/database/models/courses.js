const {sequelize, Datatypes} = require("sequelize");

module.exports = (sequelize, Datatypes) => {

    const Course = sequelize.define("Course", {
        
            name : {
                type: Datatypes.STRING,
                allowNull: false
            },
            price: {
                type: Datatypes.INTEGER,
                allowNull: false
            },
            discount: {
                type: Datatypes.INTEGER,
                allowNull: false
        
            },
            description : {
                type: Datatypes.STRING,
                allowNull: false
            },
            image: {
                type: Datatypes.STRING,
                allowNull: false
            }
        })
    
    return Course;
    

}