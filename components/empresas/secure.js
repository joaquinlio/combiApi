const auth = require("../../auth");
module.exports = function checkAuth(action) {
  function middleware(req, res, next) {
    switch (action) {
      case "login":
        auth.check.logged(req);
        next();
        break;
      default:
        next();
        break;
    }
  }
  return middleware;
};
