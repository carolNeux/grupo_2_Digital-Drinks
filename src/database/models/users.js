const {sequelize, DataTypes} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User',
    {
        username: {
            type: DataTypes.STRING, 
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthday: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        user_category_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }     
    },
    { 
        timestamps: false, /*Opciones si no ponemos created_at y updated_at nos va a tratar de llenar esa columna por eso le ponemos el timestamps*/
        tableName: "users", //nombre de la tabla (es opcional si tienen los mismos nombres)
    });
    User.associate = models => {
        User.belongsTo(models.userCategory);
    };
    return User;
};