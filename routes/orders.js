const Order = require('../model/Order');

async function get(_id) {
  const order = await Order.findById(_id).populate('products').exec();
  return order;
}

async function list(opts = {}) {
  const { offset = 0, limit = 25, productId, status } = opts;
  const query = {};
  if (productId) query.products = productId;
  if (status) query.status = status;
  const orders = await Order.find(query)
    .skip(offset)
    .limit(limit)
    .sort({ _id: 1 })
    .populate('products')
    .exec();
  return orders;
}

async function update(_id, fields) {
  const order = await Order.findByIdAndUpdate(_id, fields, {
    new: true,
    runValidators: true,
  });
  return order;
}

async function create(fields) {
  const order = await new Order(fields).save();
  return order;
}

async function remove(_id) {
  const order = await Order.findByIdAndDelete(_id);
  return order;
}

module.exports = {
  list,
  get,
  create,
  update,
  delete: remove,
};
