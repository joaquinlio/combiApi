const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./connection");
const UsuariosRoutes = require("./routes/usuarios");
var app = express();

app.use(bodyParser.json());

app.use("/usuarios", UsuariosRoutes);

app.listen(3001);
