// This will eliminate the need to write try/catch blocks in our routes
// const autoCatch = (fn) => {
//   return function (req, res, next) {
//     fn(req, res, next).catch(next);
//   };
// };

// module.exports = {
//   autoCatch,
// };

const autoCatch = (funcs) => {
  const wrapped = {}; // create an empty object
  Object.keys(funcs).forEach((key) => {
    // iterate over the keys of the object
    wrapped[key] = function (req, res, next) {
      // create a new function for each key
      funcs[key](req, res, next).catch(next); // call the original function and catch any errors
    };
  });
  return wrapped; // return the new object
};

module.exports = {
  autoCatch,
};
