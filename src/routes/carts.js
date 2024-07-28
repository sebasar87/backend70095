const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const cartManager = new CartManager();

router.post('/', (req, res) => {
  const cart = cartManager.createCart();
  res.status(201).json(cart);
});

router.get('/:cid', (req, res) => {
  const cart = cartManager.getCartById(parseInt(req.params.cid));
  if (cart) {
    res.json(cart.products);
  } else {
    res.status(404).send('Cart not found');
  }
});

router.post('/:cid/product/:pid', (req, res) => {
  const cartId = parseInt(req.params.cid);
  const productId = parseInt(req.params.pid);
  const cart = cartManager.addProductToCart(cartId, productId);
  if (cart) {
    res.status(201).json(cart);
  } else {
    res.status(404).send('Cart not found');
  }
});

module.exports = router;
