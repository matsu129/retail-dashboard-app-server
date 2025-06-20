const express = require('express');
const app = express();
const productsRoute = require('./routes/products');

app.use(express.json());
app.use('/api/products', productsRoute);

app.use(express.static('../retail-dashboard-app'));

app.listen(3000, () => {
  console.log('Server activating: http://localhost:3000');
});
