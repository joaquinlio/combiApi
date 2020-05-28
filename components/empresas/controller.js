const TABLA = "empresas";
module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../store/dummy");
  }
  function list() {
    return store.list(TABLA);
  }
  /* function get(id) {
    return store.get(TABLA, id);
  } */
  async function upsert(userid, body) {
    const empresas = {
      nombre: body.texto,
    };
    if (body.id) {
      empresas.id = body.id;
    }
    return store.upsert(TABLA, empresas);
  }
  async function get(id) {
    /* let empresa = await store.get(TABLA, id);
    let rutas = await store.query(TABLA + "_rutas", { idEmpresa: id });

    empresa[0].rutas = await Promise.all(
      rutas.map(async (ruta, key) => {
        ruta.coordenadas = await store.query("rutas_coordenadas", {
          idRuta: ruta.id,
        });
        return ruta;
      })
    );
    return empresa; */
    var rad = function (x) {
      return (x * Math.PI) / 180;
    };
    var p1 = { lat: -34.797861406091485, lng: -58.39519691731324 };
    var p2 = { lat: -34.800302290906146, lng: -58.40224031457789 };
    var getDistance = function (p1, p2) {
      var R = 6378137; // Earth’s mean radius in meter
      var dLat = rad(p2.lat - p1.lat);
      var dLong = rad(p2.lng - p1.lng);
      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1.lat)) *
          Math.cos(rad(p2.lat)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      return d; // returns the distance in meter
    };
    return getDistance(p1, p2);
  }
  return {
    list,
    get,
    upsert,
  };
};
