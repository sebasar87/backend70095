const fs = require('fs-extra');
const path = './data/carts.json';

class CartManager {
  constructor() {
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(path, 'utf-8');
      this.carts = JSON.parse(data) || [];
    } catch (error) {
      console.log('Error loading carts:', error);
      this.carts = [];
    }
  }

  async saveCarts() {
    try {
      await fs.writeFile(path, JSON.stringify(this.carts, null, 2));
    } catch (error) {
      console.log('Error saving carts:', error);
    }
  }

  createCart() {
    const cart = {
      id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
      products: []
    };
    this.carts.push(cart);
    this.saveCarts();
    return cart;
  }

  getCartById(id) {
    return this.carts.find(c => c.id === id);
  }

  addProductToCart(cartId, productId, quantity = 1) {
    const cart = this.getCartById(cartId);
    if (!cart) return null;

    const productIndex = cart.products.findIndex(p => p.product === productId);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
    this.saveCarts();
    return cart;
  }
}

module.exports = CartManager;
