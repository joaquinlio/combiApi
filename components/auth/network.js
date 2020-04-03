const express = require("express");
const Router = express.Router();
const response = require("../../network/response");
const controller = require("./index");

Router.post("/login", function(req, res) {
  controller
    .login(req.body.username, req.body.password)
    .then(token => {
      response.success(req, res, token, 200);
    })
    .catch(e => {
      response.error(req, res, "Informacion invalida", 400);
    });
});
module.exports = Router;
