const TABLA = "empresas";
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
    const empresas = {
      nombre: body.texto,
    };
    if (body.id) {
      empresas.id = body.id;
    }
    return store.upsert(TABLA, empresas);
  }
  /* async function get(id) {
    //let empresa = await store.get(TABLA, id);
    let rutas = await store.query(TABLA + "_rutas", { id_empresa: id });

    rutas = await Promise.all(
      rutas.map(async (ruta, key) => {
        let coordenadas = await store.query(
          "rutas_coordenadas",
          {
            id_ruta: ruta.id,
          },
          null,
          "coordenadas"
        );
        ruta.coordenadas = await Promise.all(
          coordenadas.map((coordenada) => {
            return {
              latitude: coordenada.coordenadas.x,
              longitude: coordenada.coordenadas.y,
            };
          })
        );
        return ruta;
      })
    );
    return rutas;
  } */
  return {
    list,
    get,
    upsert,
  };
};
