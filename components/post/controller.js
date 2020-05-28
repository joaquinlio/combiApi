const TABLA = "post";
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../store/dummy");
  }
  function list() {
    return store.list(TABLA);
  }
  function get(id) {
    return store.get(TABLA, id);
  }
  async function upsert(userid, body) {
    const post = {
      texto: body.texto,
      userid: userid,
    };
    if (body.id) {
      post.id = body.id;
    }
    return store.upsert(TABLA, post);
  }
  return {
    list,
    get,
    upsert,
  };
};
