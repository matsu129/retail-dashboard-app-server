const express = require('express');
const app = express();
const path = require('path');
const productsRoute = require('./routes/products');
const reviewsRoute = require('./routes/reviews');
const cartRoute = require('./routes/cart');

app.use(express.json());
app.use('/api/products', productsRoute);
app.use('/api/reviews', reviewsRoute);
app.use('/api/cart', cartRoute);
app.use(express.static(path.join(__dirname, '../retail-dashboard-app')));

app.listen(3000, () => {
  console.log('Server activating: http://localhost:3000');
});
app.use((err, req, res, next) => {
  console.error('💥 Server error:', err.stack);
  res.status(500).send('Internal Server Error');
});