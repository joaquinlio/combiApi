const request = require("request");
function createRemoteDB(host, port) {
  const URL = "http://" + host + ":" + port;

  function list(table) {
    return req("GET", table);
  }
  function get(table, id) {
    return req("GET", table, id);
  }
  function upsert(table, data) {
    return req("POST", table, data);
  }
  /*function query(table, query, join) {} */
  function req(method, table, data) {
    let url = URL + "/" + table;
    body = "";

    if (data && method == "GET") {
      url = url + "/" + data;
    }
    if ((data && method == "POST") || method == "PUT") {
      body = JSON.stringify(data);
    }

    return new Promise((resolve, reject) => {
      request(
        {
          method,
          headers: {
            "content-type": "application/json",
          },
          url,
          body,
        },
        (err, req, body) => {
          if (err) {
            console.error("error con DB remota", err);
            return reject(err.message);
          }

          const resp = JSON.parse(body);
          return resolve(resp.body);
        }
      );
    });
  }
  return { list, get, upsert };
}
module.exports = createRemoteDB;
