const Products = require("./routes/products");
const Orders = require("./routes/orders");
const Users = require("./routes/users");
const { autoCatch } = require("./lib/auto-catch"); // callback function for /products?offset=0&limit=25

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  const products = await Products.list({
    offset: Number(offset),
    limit: Number(limit),
    tag,
  });

  res.json(products);
}

// callback function for /products/:id
async function getProduct(req, res, next) {
  const { id } = req.params;

  const product = await Products.get(id);
  if (!product) return next();

  res.json(product);
}

async function createProducts(req, res, next) {
  if (!req.isAdmin) return forbidden(next);
  const product = await Products.create(req.body);
  res.json(product);
}

async function updateProduct(req, res, next) {
  if (!req.isAdmin) return forbidden(next);

  const product = await Products.update(req.params.id, req.body);
  res.json(product);
}

async function deleteProduct(req, res, next) {
  if (!req.isAdmin) return forbidden(next);

  await Products.delete(req.params.id);
  res.json({ success: true, message: "Product deleted" });
}

async function listOrders(req, res, next) {
  const { offset = 0, limit = 25, productId, status } = req.query;
  const options = {
    offset: Number(offset),
    limit: Number(limit),
    productId,
    status,
  };
  if (!req.isAdmin) options.username = req.user.username;
  const orders = await Orders.list(options);
  res.json(orders);
}

async function createOrder(req, res, next) {
  const fields = req.body;
  if (!req.isAdmin) fields.username = req.user.username;
  const order = await Orders.create(fields);
  res.json(order);
}

// Users
async function listUsers(req, res, next) {
  const { offset = 0, limit = 25 } = req.query;
  const users = await Users.list({
    offset: Number(offset),
    limit: Number(limit),
  });

  res.json(users);
}

async function createUser(req, res, next) {
  const user = await Users.create(req.body);
  const { username, email } = user;
  res.json({ username, email });
}

async function getUser(req, res, next) {
  const { username } = req.params;
  const user = await Users.get(username);
  if (!user) return next();

  res.json(user);
}

async function updateUser(req, res, next) {
  const { username } = req.params;
  const user = await Users.update(username, req.body);
  res.json(user);
}

async function deleteUser(req, res, next) {
  const { id } = req.params;
  await Users.delete(id);
  res.json({ success: true, message: "User deleted" });
}

function forbidden(next) {
  const err = new Error("Forbidden");
  err.status = 403;
  return next(err);
}

module.exports = autoCatch({
  listProducts,
  getProduct,
  createProducts,
  updateProduct,
  deleteProduct,

  listOrders,
  createOrder,

  listUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
});
