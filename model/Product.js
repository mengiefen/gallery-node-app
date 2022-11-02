const cuid = require("cuid");
const db = require("../config/db");
const { urlSchema } = require("./validations");

const ProductSchema = new db.Schema({
  _id: { type: String, default: cuid },
  description: { type: String, required: true },
  imgThumb: urlSchema({ required: true }),
  img: urlSchema({ required: true }),
  link: urlSchema(),
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  userLink: urlSchema(),
  tags: { type: [String], index: true },
});

const Product = db.model("Product", ProductSchema);

module.exports = Product;
