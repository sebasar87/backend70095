const fs = require('fs-extra');
const path = './data/products.json';

class ProductManager {
  constructor() {
    this.products = [];
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const data = await fs.readFile(path, 'utf-8');
      this.products = JSON.parse(data) || [];
    } catch (error) {
      console.log('Error loading products:', error);
      this.products = [];
    }
  }

  async saveProducts() {
    try {
      await fs.writeFile(path, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log('Error saving products:', error);
    }
  }

  getAllProducts() {
    return this.products;
  }

  getProductById(id) {
    return this.products.find(p => p.id === id);
  }

  addProduct(product) {
    product.id = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
    this.products.push(product);
    this.saveProducts();
  }

  updateProduct(id, updatedProduct) {
    const index = this.products.findIndex(p => p.id === id);
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...updatedProduct, id: this.products[index].id };
      this.saveProducts();
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter(p => p.id !== id);
    this.saveProducts();
  }
}

module.exports = ProductManager;
