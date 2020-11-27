const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes)=>{
    const Recipe = sequelize.define('Recipe',{
        name: DataTypes.STRING,
        ingredients: DataTypes.STRING,
        method: DataTypes.STRING,
        garnish: DataTypes.STRING,
        image: DataTypes.STRING,     
    });
      { timestamps: false                         
        /*Opciones si no ponemos created_at y updated_at nos va a tratar de llenar esa columna 
        por eso le ponemos el timestamps*/
      }
        return Recipe;
};