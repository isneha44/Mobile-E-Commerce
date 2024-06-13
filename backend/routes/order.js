const express = require('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const router = express.Router();

// Create order from cart
router.post('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
  if (!cart) return res.status(404).send('Cart not found');

  const totalAmount = cart.products.reduce((total, product) => {
    return total + product.productId.price * product.quantity;
  }, 0);

  const order = new Order({
    userId: req.params.userId,
    products: cart.products,
    totalAmount,
  });

  await order.save();
  await Cart.findByIdAndDelete(cart._id);
  res.status(201).send(order);
});

// Get user's orders
router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId }).populate('products.productId');
  res.send(orders);
});

module.exports = router;
