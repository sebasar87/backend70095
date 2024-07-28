const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');
const productManager = new ProductManager();

router.get('/', (req, res) => {
  res.json(productManager.getAllProducts());
});

router.get('/:pid', (req, res) => {
  const product = productManager.getProductById(parseInt(req.params.pid));
  if (product) {
    res.json(product);
  } else {
    res.status(404).send('Product not found');
  }
});

router.post('/', (req, res) => {
  const product = req.body;
  productManager.addProduct(product);
  res.status(201).json(product);
});

router.put('/:pid', (req, res) => {
  const updatedProduct = req.body;
  productManager.updateProduct(parseInt(req.params.pid), updatedProduct);
  res.send('Product updated');
});

router.delete('/:pid', (req, res) => {
  productManager.deleteProduct(parseInt(req.params.pid));
  res.send('Product deleted');
});

module.exports = router;
