//const store = require("../../store/mysql");
const config = require("../../config");
const ctrl = require("./controller");

let store, cache;
if (config.remoteDB) {
  store = require("../../store/remote-mysql");
  cache = require("../../store/remote-cache");
} else {
  store = require("../../store/mysql");
  cache = require("../../store/redis");
}

module.exports = ctrl(store, cache);
