const auth = require("../../auth/index");
const TABLA = "auth";
const bcrypt = require("bcrypt");
const saltRounds = 5;

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../store/mysql");
  }
  async function upsert(data) {
    const authData = {};
    if (data.email) {
      authData.email = data.email;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, saltRounds);
    }
    return store.upsert(TABLA, authData);
  }
  async function login(email, password) {
    const data = await store.query(TABLA, { email: email });
    return bcrypt.compare(password, data.password).then(async (sonIguales) => {
      if (sonIguales) {
        const dataUsuario = await store.get("usuarios", data.id);
        const token = auth.sign(data.id);
        return { sesion: dataUsuario[0], token };
      } else {
        throw new Error("Informacion Invalida");
      }
    });
  }

  return { upsert, login };
};
