const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config.js");
const usuario = require("./components/usuarios/network");
const auth = require("./components/auth/network");
const app = express();
app.use(bodyParser.json());

app.use("/usuarios", usuario);
app.use("/auth", auth);

app.listen(config.api.port, () => {
  console.log("CombiApi escuchando en el puerto ", config.api.port);
});
