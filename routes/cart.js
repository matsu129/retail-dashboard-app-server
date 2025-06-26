const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');

function readProducts(){
  return JSON.parse(fs.readFileSync(productsPath, 'utf-8'));
}

function writeProducts(products) {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
}

router.post('/purchase', (req, res) => {
  const cartItems = req.body;
  let products = readProducts();
  const errors = [];

  cartItems.forEach(item => {
    const product = products.find(p => String(p.id) === String(item.id));
    if (!product) {
      errors.push(`product not found: ${item.id}`);
    } else if (product.stock < item.quantity) {
      errors.push(`Not enough stock for ${product.name}`);
    }
  });

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }
  
  products = products.map(product => {
    const cartItem = cartItems.find(i => String(i.id) === String(product.id));
    if (cartItem) {
      return {
        ...product,
        stock: product.stock - cartItem.quantity
      };
    }
    return product;
  });

  writeProducts(products);
  res.json({ message: 'Purchase complete successfully' });
});

module.exports = router;