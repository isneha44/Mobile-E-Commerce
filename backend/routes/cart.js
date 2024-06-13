const express = require('express');
const Cart = require('../models/Cart');
const router = express.Router();

// Get user's cart
router.get('/:userId', async (req, res) => {
  const cart = await Cart.findOne({ userId: req.params.userId }).populate('products.productId');
  if (!cart) return res.status(404).send('Cart not found');
  res.send(cart);
});

// Add product to cart
router.post('/:userId', async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ userId: req.params.userId });

  if (!cart) {
    cart = new Cart({ userId: req.params.userId, products: [{ productId, quantity }] });
  } else {
    const productIndex = cart.products.findIndex(p => p.productId == productId);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
  }

  await cart.save();
  res.status(201).send(cart);
});

// Remove product from cart
router.delete('/:userId/:productId', async (req, res) => {
  let cart = await Cart.findOne({ userId: req.params.userId });
  cart.products = cart.products.filter(p => p.productId != req.params.productId);
  await cart.save();
  res.send(cart);
});

module.exports = router;
