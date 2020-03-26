const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "combiApp"
});

mysqlConnection.connect(err => {
  if (!err) {
    console.log("Mysql conect");
  } else {
    console.log("Mysql error");
  }
});
module.exports = mysqlConnection;
