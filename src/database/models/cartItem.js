const {sequelize, Datatypes} = require ('sequelize');

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('CartItem', {
      
    salePrice: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    subtotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    state: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    productId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cartId: {
        type: DataTypes.INTEGER,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
  })
    
    CartItem.associate = (models) => {
        CartItem.belongsTo(models.Cart, {
            as: "Cart",
          });

        CartItem.belongsTo(models.User, {
          as: "User",
        });
      
        CartItem.belongsTo(models.Product, {
          as: "Product",
        });  
    }
    
    return CartItem;
}