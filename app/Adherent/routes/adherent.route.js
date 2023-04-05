const express = require("express");
const routes = express.Router();

const adherentControllers = require("../controllers/adherent.controller");

routes.get("", function (req, res) {
  adherentControllers.getAdherent(req, res);
});

routes.post("", function (req, res) {
  adherentControllers.postAdherent(req, res);
});

module.exports = {
  routes,
};
