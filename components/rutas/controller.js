const TABLA = "empresas_rutas";
const getDistance = require("../../utils/getDistance");

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
  async function getRutasCercanas(query) {
    let coordenadas = await store.list("rutas_coordenadas");

    let arrayRutas = await Promise.all(
      coordenadas.map(async (coordenada) => {
        let coordenadaParse = {
          latitude: coordenada.coordenadas.x,
          longitude: coordenada.coordenadas.y,
        };
        let distance = await getDistance(query, coordenadaParse);
        distance = Math.round(distance);
        return {
          id: coordenada.id_ruta,
          distance,
        };
      })
    );
    let rutasParced = [];
    await Promise.all(
      //dejo las distancias mas cortas de cada ruta
      arrayRutas.map(async (ruta, key) => {
        let repeat = false;
        for (let index = 0; index < rutasParced.length; index++) {
          if (rutasParced[index].id == ruta.id) {
            rutasParced[index].distance > ruta.distance &&
              (rutasParced[index].distance = ruta.distance);
            const join = {};
            join["empresas"] = "id_empresa";
            let empresaRuta = await store.query(
              "empresas_rutas",
              { id: ruta.id },
              join,
              "empresas_rutas.nombre as ruta, empresas.nombre as empresa,empresas.logo"
            );

            rutasParced[index].nombre = empresaRuta.ruta;
            rutasParced[index].empresa = empresaRuta.empresa;
            rutasParced[index].logo = empresaRuta.logo;
            let coordenadasFilter = await coordenadas.filter(
              (coordenada) => coordenada.id_ruta == ruta.id
            );
            coordenadasFilter = await coordenadasFilter.map((coordenada) => {
              return {
                latitude: coordenada.coordenadas.x,
                longitude: coordenada.coordenadas.y,
              };
            });
            rutasParced[index].coordenadas = coordenadasFilter;
            /* rutasParced[index].coordenadas = coordenadas.map((coordenada) => {
              if (coordenada.id_ruta == ruta.id) {
                return {
                  latitude: coordenada.coordenadas.x,
                  longitude: coordenada.coordenadas.y,
                };
              }
            }); */
            repeat = true;
          }
        }
        if (!repeat) {
          rutasParced.push(ruta);
        }
      })
    );
    rutasParced = await rutasParced.sort((a, b) => a.distance - b.distance); //ordenar de menor a mayor
    return rutasParced;
  }
  return {
    list,
    get,
    upsert,
    getRutasCercanas,
  };
};
