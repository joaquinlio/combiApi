const express = require("express");
const Router = express.Router();
const response = require('../../network/response');
const controller = require('./index')
//const mysqlConnection = require("../connection");
var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

Router.get("/",list);
Router.get("/:id",get);
Router.post("/",upsert);
Router.put("/",upsert);

function list(req,res){
  controller.list()
    .then((lista) => {
      response.success(req,res,lista,200)
    })
    .catch((err) => {
      response.error(req,res,err.message,500)
    })
}
function get(req,res){
  const user = controller.get(req.params.id).then((user) => {
    response.success(req,res,user,200)
  }).catch((err)=> {
    response.error(req,res,err.message,500)
  });
}
function upsert(req,res){
  controller.upsert(req.body).then((user) => {
     response.success(req,res,user,201)
  })
}
/* Router.post("/login", (req, res) => {
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
}); */
module.exports = Router;
