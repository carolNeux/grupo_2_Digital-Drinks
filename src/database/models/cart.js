const {sequelize, DataTypes} = require ('sequelize');

module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {   
      order: {
          type: DataTypes.INTEGER,
          allowNull: false
      },

      userId: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      total: {
          type: DataTypes.INTEGER,
          allowNull: false
      }
  })
  
  Cart.associate = (models) => {
      Cart.hasMany(models.CartItem, {
          as: "CartItem",
        });
      Cart.belongsTo(models.User, {
          as: "User"
        });
  }   

    return Cart;
}