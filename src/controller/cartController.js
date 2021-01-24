const { Product, User, Cart, CartItem } = require('../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
  addToCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const product = await Product.findByPk(productId, {
        include: ['Category']
      });
      const price = product.discount > 0 ? product.price - (product.price * product.discount / 100) : product.price;
      await CartItem.create({
        salePrice : price,
        quantity : quantity,
        subtotal : quantity * price,
        state: 1,
        userId: req.session.user.id,
        productId: product.id,
        cartId: null,
        image: product.image
      })
      res.redirect('/products');

    } catch (error) {
        console.log(error);
    }
  },
  showCart:  async (req, res) => {
    try {
      const cartItems = await CartItem.findAll({
        where: {
          userId: req.session.user.id,
          state: 1,
        },
        include: {
          all: true
        }
      });
      const total = cartItems.reduce((total, cartItem) => total = (total + Number(cartItem.subtotal)), 0)
      res.render('./carts/productsCart', { cartItems, total });

    } catch (error) {
      console.log(error);
    }
  },
  deleteCartItem:  async (req, res) => {
    try {
      await CartItem.destroy({
        where: {
          productId: req.body.idProduct,
          userId: req.session.user.id
        }
      });
      res.redirect('/cart');

    } catch (error) {
      console.log(error);
    }
  },
  purchase:  async (req, res) => {
    try {
      const cartItems = await CartItem.findAll({
        where: {
          userId: req.session.user.id,
          state: 1,
        },
        include: {
          all: true
        }
      });
      console.log(cartItems);
      const finalPrice = cartItems.reduce((finalPrice, cartItem) => finalPrice = (finalPrice + Number(cartItem.subtotal)), 0);

      const lastCart = await Cart.findOne({
        order: [['createdAt', 'DESC']]
      });
      const cart = await Cart.create({
        order: lastCart ? lastCart.order + 1 : 1,
        total: finalPrice,
        userId: req.session.user.id
      });     
      console.log(cart);
      try {
        await CartItem.update({
          state: 0,
          cartId: cart.id
        },{
          where: {
              userId: req.session.user.id,
              state: 1
          }
              });
        
      } catch (error) {
          console.log(error);       
      }
      res.redirect('/cart');
      // console.log(cartItems);
      
    } catch (error) {
      
    }
  },
  cartsHistory:  async (req, res) => {
    try {
      const carts = await Cart.findAll({
        where: {
          userId: req.session.user.id
        },
        include: {
          all: true,
          nested: true
        }
      });
      // res.render('./carts/cartsHistory', { carts });
      res.send(carts);
    } catch (error) {
      console.log(error);
    }
  },
  purchaseDetail:  async (req, res) => {
    try {
      
    } catch (error) {
      
    }
  }
}