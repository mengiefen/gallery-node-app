const express = require("express");
const api = require("./api");
const auth = require("./auth/auth");
const middleware = require("./middleware");
const bodyParser = require("body-parser");

const port = process.env.PORT2 || 1337;

// Create an Express Application
const app = express();

// Middleware
app.use(middleware.cors);
app.use(bodyParser.json());
auth.setMiddleware(app);

app.post("/login", auth.authenticate, auth.login);

// GET Home page
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// GET /products
app.get("/products", api.listProducts);

// GET /products/:id
app.get("/products/:id", api.getProduct);

// POST /products
app.post("/products", auth.ensureAdmin, api.createProducts);

// PUT /products/:id
app.put("/products/:id", auth.ensureAdmin, api.updateProduct);

// DELETE /products/:id
app.delete("/products/:id", auth.ensureAdmin, api.deleteProduct);

// GET /Orders
app.get("/orders", auth.ensureAdmin, api.listOrders);

// POST /Orders
app.post("/orders", auth.ensureAdmin, api.createOrder);

// GET /Users
app.get("/users", api.listUsers);

// POST /users
app.post("/users", api.createUser);

// GET a User
app.get("/users/:id", api.getUser);

// DELETE /users/:id
app.delete("/users/:id", api.deleteUser);

// PUT /users/:id
app.put("/users/:id", api.updateUser);

// Error Handler - catch all errors and forward to error handler
app.use(middleware.handleErrors);

// Not Found - catch 404 and forward to error handler
app.use(middleware.notFound);

// Listen on port 3000
app.listen(port, () => console.log(`Server listening on port ${port}`));
