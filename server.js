const express = require('express');
const app = express();
const path = require('path');
const productsRoute = require('./routes/products');
const reviewsRouter = require('./routes/reviews');

app.use(express.json());
app.use('/api/products', productsRoute);
app.use('/api/reviews', reviewsRouter);
app.use(express.static(path.join(__dirname, '../retail-dashboard-app')));

app.listen(3000, () => {
  console.log('Server activating: http://localhost:3000');
});
