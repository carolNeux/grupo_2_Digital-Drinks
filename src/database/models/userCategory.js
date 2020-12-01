const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const userCategory = sequelize.define('userCategory',
    {
        name: DataTypes.STRING,    
    },
    { 
        timestamps: false, /*Opciones si no ponemos created_at y updated_at nos va a tratar de llenar esa columna por eso le ponemos el timestamps*/
        tableName: "user_category", //nombre de la tabla (es opcional si tienen los mismos nombres)
    });
    userCategory.associate = models => {
        userCategory.hasMany(models.User);
    };
    return userCategory;
};