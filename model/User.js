const db = require("../config/db");
const cuid = require("cuid");
const { emailSchema, usernameSchema } = require("./validations");

const UserSchema = new db.Schema({
  _id: { type: String, default: cuid },
  name: { type: String, required: true },
  username: usernameSchema(),
  email: emailSchema({ required: true }),
  password: { type: String, maxLength: 120, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const User = db.model("User", UserSchema);

module.exports = User;
