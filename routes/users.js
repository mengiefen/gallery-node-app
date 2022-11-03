const bcrypt = require("bcrypt");
const User = require("../model/User");

const SALT = 10;

async function get(username) {
  return await User.findOne({ username: username });
}

async function list(opts = {}) {
  const { offset = 0, limit = 25 } = opts;
  return await User.find().sort({ _id: 1 }).skip(offset).limit(limit);
}

async function create(fields) {
  const user = new User(fields);
  await hashPassword(user);
  await user.save(); // problem is here --> Validation error

  return user;
}

async function update(username, fields) {
  const user = await get(username);
  Object.keys(fields).forEach((key) => {
    user[key] = fields[key];
  });
  if (fields.password) {
    await hashPassword(user);
  }
  await user.save();
  return user;
}

async function remove(id) {
  await User.findByIdAndDelete(id);
}

async function hashPassword(user) {
  if (!user.password) throw user.invalidate("password", "Password is required");
  if (user.password.length < 8)
    throw user.invalidate("password", "Password must be at least 8 characters");
  user.password = await bcrypt.hash(user.password, SALT);
}

module.exports = {
  get,
  list,
  create,
  update,
  delete: remove,
};
