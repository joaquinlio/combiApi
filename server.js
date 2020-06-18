const express = require("express");
const bodyParser = require("body-parser");
const config = require("./config.js");
const usuario = require("./components/usuarios/network");
const auth = require("./components/auth/network");
const post = require("./components/post/network");
const empresas = require("./components/empresas/network");
const rutas = require("./components/rutas/network");
const errors = require("./network/errors");

const app = express();
app.use(bodyParser.json());

app.use("/usuarios", usuario);
app.use("/auth", auth);
app.use("/post", post);
app.use("/empresas", empresas);
app.use("/rutas", rutas);

app.use(errors);

app.listen(config.api.port, () => {
  console.log("CombiApi escuchando en el puerto ", config.api.port);
});
