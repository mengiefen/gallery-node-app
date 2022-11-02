const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");

const sessionSecret = process.env.SESSION_SECRET || "Make it happen";
const adminPassword = process.env.ADMIN_PASSWORD || "IamM@JUHERE";

passport.use(AdminStrategy());
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));
const authenticate = passport.authenticate("local");

function setMiddleware(app) {
  app.use(session());
  app.use(cookieParser());
  app.use(
    expressSession({
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
}

function session() {
  return expressSession({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  });
}

function login(req, res, next) {
  res.json({ message: "success" });
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
const ensureAdmin = (req, res, next) => {
  const isAdmin = req.user && req.user.username == "admin";

  if (isAdmin) return next();

  const err = new Error("Unauthorized");
  err.statusCode = 401;
  next(err);
};

module.exports = {
  ensureAdmin,
  setMiddleware,
  login,
  authenticate,
};
