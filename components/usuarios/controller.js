const TABLA = "usuarios";
const auth = require("../auth");

module.exports = function (injectedStore, injectedCache) {
  let cache = injectedCache;
  let store = injectedStore;

  if (!store) {
    store = require("../../store/dummy");
  }
  if (!cache) {
    cache = require("../../store/dummy");
  }
  async function list() {
    let users = await cache.list(TABLA);
    if (!users) {
      console.log("no estaba en cache BUSCANDO EN DB");
      users = await store.list(TABLA);
      cache.upsert(TABLA, users);
    } else {
      console.log("no hay datos cache");
    }
    return users;
  }
  function get(id) {
    return store.get(TABLA, id);
  }
  async function upsert(body) {
    const user = {
      name: body.name,
      email: body.email,
    };
    if (body.id) {
      user.id = body.id;
    }
    if (body.password || body.email) {
      await auth.upsert({
        email: user.email,
        password: body.password,
      });
    }
    return store.upsert(TABLA, user);
  }
  function follow(from, to) {
    return store.upsert(TABLA + "_follow", { user_from: from, user_to: to });
  }
  function getFollowers(from) {
    const join = {};
    join[TABLA] = "user_to";
    const query = { user_from: from };
    return store.query(TABLA + "_follow", query, join);
  }
  return {
    list,
    get,
    upsert,
    follow,
    getFollowers,
  };
};
