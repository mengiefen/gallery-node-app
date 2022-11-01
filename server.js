const express = require('express');
const api = require('./api');
const middleware = require('./middleware');
const bodyParser = require('body-parser');
const port = process.env.PORT2 || 1337;

// Create an Express Application
const app = express();

// Middleware
app.use(middleware.cors);
app.use(bodyParser.json());

// GET Home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// GET /products
app.get('/products', api.listProducts);

// GET /products/:id
app.get('/products/:id', api.getProduct);

// POST /products
app.post('/products', api.createProducts);

// PUT /products/:id
app.put('/products/:id', api.updateProduct);

// DELETE /products/:id
app.delete('/products/:id', api.deleteProduct);

// GET /Orders
app.get('/orders', api.listOrders);

// POST /Orders
app.post('/orders', api.createOrder);

// Error Handler - catch all errors and forward to error handler
app.use(middleware.handleErrors);

// Not Found - catch 404 and forward to error handler
app.use(middleware.notFound);

// Listen on port 3000
app.listen(port, () => console.log(`Server listening on port ${port}`));
