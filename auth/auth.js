const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET || "Make it happen";
const adminPassword = process.env.ADMIN_PASSWORD || "IamM@JUHERE";
const jwtOptions = {
  algorithm: "HS256",
  expiresIn: "30d",
};

passport.use(AdminStrategy());
const authenticate = passport.authenticate("local", { session: false });

function setMiddleware(app) {
  app.use(cookieParser());
}
// A middleware to ensure the user is logged in
async function login(req, res, next) {
  const token = await sign({ username: req.user.username });
  res.cookie("jwt", token, { httpOnly: true });

  res.json({ success: true, token });
}

async function sign(payload) {
  const token = await jwt.sign(payload, jwtSecret, jwtOptions);
  return token;
}

function AdminStrategy() {
  return new Strategy(function (username, password, cb) {
    const isAdmin = username === "admin" && password === adminPassword;

    if (isAdmin) {
      cb(null, { username: "admin" });
    } else {
      cb(null, false);
    }
  });
}

// A middleware to ensure the user is an admin
const ensureAdmin = async (req, res, next) => {
  const jwtString = req.headers.authorization || req.cookies.jwt;
  const payload = await verify(jwtString);
  if (payload.username === "admin") return next();

  const err = new Error("Unauthorized");
  err.statusCode = 401;
  next(err);
};

async function verify(jwtString) {
  jwtString = jwtString.replace("Bearer ", "");
  try {
    const payload = await jwt.verify(jwtString, jwtSecret);
    return payload;
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }
}

module.exports = {
  ensureAdmin,
  setMiddleware,
  login,
  authenticate,
};
