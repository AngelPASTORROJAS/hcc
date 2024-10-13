const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
app.use(morgan("dev"));

const env = require("dotenv-expand").expand(require("dotenv").config());

// Importations des routes
const adherentRoute = require("./Adherent/routes/adherent.route");

// Configuration des middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration des routes
app.use("/Adherent", adherentRoute.routes);


// Configuration des gestionnaires d'erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = {app, env};