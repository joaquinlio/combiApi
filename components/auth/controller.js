const auth = require("../../auth/index");
const TABLA = "auth";
module.exports = function(injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../store/dummy");
  }
  function upsert(data) {
    const authData = {
      id: data.id
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = data.password;
    }
    return store.upsert(TABLA, authData);
  }
  async function login(username, password) {
    const data = await store.query(TABLA, { username: username });
    console.log(data);
    console.log(password);
    if (data.password == password) {
      //Generar token
      return auth.sign(data);
    } else {
      throw new Error("Informacion Invalida");
    }
  }

  return { upsert, login };
};
