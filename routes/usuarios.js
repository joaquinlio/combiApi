const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

Router.get("/", (req, res) => {
  mysqlConnection.query("SELECT * from usuarios", (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
  });
});
Router.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;

  mysqlConnection.query(
    "SELECT * from usuarios WHERE email ='" + email + "'",
    (err, result) => {
      if (!err) {
        if (result.length) {
          result = JSON.parse(JSON.stringify(result[0]));
          var hash = bcrypt.hashSync(result.password, saltRounds);
          if (bcrypt.compareSync(password, hash)) {
            var tokenData = {
              id: result.id
            };
            var token = jwt.sign(tokenData, "maleTloveu", {
              expiresIn: 60 * 60 * 24 // expires in 24 hours
            });
            res.json({
              id: result.id,
              nombre: result.nombre,
              apellido: result.apellido,
              token
            });
          } else {
            res.json({
              error: "Email o contraseña incorrectas"
            });
            return;
          }
        } else {
          res.json({
            error: "Email o contraseña incorrectas"
          });
        }
      } else {
        console.log(err);
      }
    }
  );
});
Router.post("/register", (req, res) => {
  var nombre = req.body.nombre;
  var apellido = req.body.apellido;
  var email = req.body.email;
  var password = req.body.password;

  password = bcrypt.hashSync(password, saltRounds);

  mysqlConnection.query(
    `INSERT INTO usuarios (nombre, apellido, email, password)VALUES ('${nombre}', "${apellido}", "${email}", "${password}")`,
    (err, result) => {
      if (!err) {
        mysqlConnection.query(
          "SELECT * from usuarios WHERE email ='" + email + "'",
          (err, result) => {
            console.log(result);
            if (!err) {
              if (result.length) {
                result = JSON.parse(JSON.stringify(result[0]));

                var tokenData = {
                  id: result.id
                };
                var token = jwt.sign(tokenData, "maleTloveu", {
                  expiresIn: 60 * 60 * 24 // expires in 24 hours
                });
                res.json({
                  id: result.id,
                  nombre: result.nombre,
                  apellido: result.apellido,
                  token
                });
              } else {
                res.json({
                  error: "Error al crear usuario"
                });
              }
            } else {
              console.log(err);
            }
          }
        );
      } else {
        console.log(err);
      }
    }
  );
});
module.exports = Router;
