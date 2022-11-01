const fs = require('fs').promises;
// const path = require("path");
const Product = require('../model/Product');

// const productFile = path.join(__dirname, "./products.json");
async function list(opts = {}) {
  const { offset = 0, limit = 25, tag } = opts;

  // const data = await fs.readFile(productFile);
  // return JSON.parse(data)
  //   .filter((product) => !tag || product.tags.includes(tag))
  //   .slice(offset, offset + limit);

  const query = tag ? { tags: tag } : {};
  const products = await Product.find(query)
    .skip(offset)
    .limit(limit)
    .sort({ _id: 1 });
  return products;
}

async function get(id) {
  // const data = await fs.readFile(productFile);
  // return JSON.parse(data).find((product) => product.id === id);

  const product = await Product.findById(id);

  return product;
}

async function create(fields) {
  const product = await new Product(fields).save();
  return product;
}

async function update(_id, fields) {
  const product = await Product.findByIdAndUpdate(_id, fields, {
    new: true,
    runValidators: true,
  });

  // const product = await get(id);

  // Object.keys(fields).forEach((key) => {
  //   product[key] = fields[key];
  // });

  // await product.save();

  return product;
}

async function remove(id) {
  const product = await Product.findByIdAndDelete(id);
  return product;
}

module.exports = {
  list,
  get,
  create,
  update,
  delete: remove,
};
