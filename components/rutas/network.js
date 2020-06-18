const express = require("express");
const router = express.Router();
const response = require("../../network/response");
const controller = require("./index");
const secure = require("./secure");

router.get("/", list);
//router.get("/:id", get);
router.post("/", secure("login"), upsert);
router.put("/", secure("login"), upsert);
router.get("/cercanas", getRutasCercanas);

function list(req, res, next) {
  controller
    .list()
    .then((data) => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}
function get(req, res, next) {
  controller
    .get(req.params.id)
    .then((empresa) => {
      response.success(req, res, empresa, 200);
    })
    .catch(next);
}
function upsert(req, res, next) {
  controller
    .upsert(req.user.id, req.body)
    .then((user) => {
      response.success(req, res, user, 201);
    })
    .catch(next);
}
function getRutasCercanas(req, res, next) {
  controller
    .getRutasCercanas(req.query)
    .then((user) => {
      response.success(req, res, user, 200);
    })
    .catch(next);
}
module.exports = router;
