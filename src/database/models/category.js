const {sequelize, Datatypes} = require ('sequelize');

module.exports = (sequelize, Datatypes) => {
    const Category = sequelize.define('Category', {
        name : {
            type: Datatypes.STRING,
            allowNull: false
        }
    })
    Category.associate = (models => {
        Category.hasMany(models.Product,{
            as: 'Product'
        })
    })
    return Category;
}