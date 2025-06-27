const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '../data/products.json');
const salesPath = path.join(__dirname, '../data/sales.json');

function readJSON(filePath){
  return fs.existsSync(filePath)
    ? JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    : [];
}

function writeJSON(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

router.post('/purchase', (req, res) => {
  const cartItems = req.body;
  let products = readJSON(productsPath);
  let sales = readJSON(salesPath);
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
  
  const now = new Date().toISOString();
  products = products.map(product => {
    const cartItem = cartItems.find(i => String(i.id) === String(product.id));
    if (cartItem) {
      sales.push({
        productId: product.id,
        name: product.name,
        quantity: cartItem.quantity,
        price: product.price,
        date: now
      });
      return {
        ...product,
        stock: product.stock - cartItem.quantity,
        sold: (product.sold || 0) + cartItem.quantity
      };
    }
    return product;
  });

  writeJSON(productsPath, products);
  writeJSON(salesPath, sales);
  res.json({ message: 'Purchase complete successfully' });
});

module.exports = router;