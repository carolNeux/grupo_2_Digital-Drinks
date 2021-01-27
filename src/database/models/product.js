const {sequelize, DataTypes} = require ('sequelize');

module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL.UNSIGNED,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category_id: { 
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    })
    
    Product.associate = (models => {
        Product.belongsTo(models.Category, {
            as: "Category"
        });
        Product.hasMany(models.CartItem, {
            as: "CartItem",
        });
    })

    return Product;
}