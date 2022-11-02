const cuid = require("cuid");
const { emailSchema } = require("./validations");
const db = require("../config/db");

const OrderSchema = new db.Schema({
  _id: { type: String, default: cuid },
  buyerEmail: emailSchema({ required: true }),
  products: [
    {
      type: String,
      ref: "Product",
      index: true,
      required: true,
    },
  ],

  status: {
    type: String,
    index: true,
    default: "CREATED",
    enum: ["CREATED", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"],
  },
});

const Order = db.model("Order", OrderSchema);

module.exports = Order;
