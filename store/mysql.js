const mysql = require("mysql");

const config = require("../config");

const dbconf = {
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
};

let connection;

function handleCon() {
  connection = mysql.createConnection(dbconf);

  connection.connect((err) => {
    if (err) {
      console.error("[db error]", err);
      setTimeout(handleCon, 2000);
    } else {
      console.log("DB connected");
    }
  });
  connection.on("error", (err) => {
    console.error("[db error]", err);
    if (err.code == "PROTOCOL_CONNECTION_LOST") {
      handleCon();
    } else {
      throw err;
    }
  });
}
handleCon();

function list(table) {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
function get(table, id) {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} WHERE id='${id}'`,
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}
function insert(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO ${table} SET ?`, data, (error, data) => {
      if (error) return reject(error);
      resolve(data);
    });
  });
}
function update(table, data) {
  return new Promise((resolve, reject) => {
    connection.query(
      `UPDATE ${table} SET ? WHERE id=?`,
      [data, data.id],
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}
function upsert(table, data) {
  if (data && data.id) {
    return update(table, data);
  } else {
    return insert(table, data);
  }
}
function query(table, query, join) {
  let joinQuery = "";
  if (join) {
    const key = Object.keys(join);
    const val = join[key];
    joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`;
  }
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`,
      query,
      (err, res) => {
        if (err) {
          return reject(err);
        }
        resolve(res || null);
      }
    );
  });
}

module.exports = {
  list,
  get,
  upsert,
  query,
  insert,
};
