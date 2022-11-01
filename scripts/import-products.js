const db = require('../model/db');
const Product = require('../model/Product');

const products = require('./products.json');

(async function () {
  for (let product of products) {
    await Product.create(product);
  }

  db.disconnect();
})();

// This is an (Immediately Invoked Function Expression - IIFE) - it is a function
//  that is executed immediately after it is defined.

// To drop the database, run the following command in the terminal:
// $ mongo
// > use PhotoApp
// > db.dropDatabase()
