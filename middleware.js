// const cors = require("cors");
async function cors(req, res, next) {
  const origin = req.headers.origin;

  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, XMODIFY"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, X-HTTP-Method-Override ,Content-Type, Accept"
  );
  next();
}
// Error Handler - catch all errors and forward to error handler
const handleErrors = (err, req, res, next) => {
  if (res.headerSent) return next(err);
  res.status(500).json({ error: "Internal Error" });
};

// Not Found - catch 404 and forward to error handler
const notFound = (req, res, next) => {
  res.status(404).json({ error: "Not Found" });
};

module.exports = {
  cors,
  handleErrors,
  notFound,
};
