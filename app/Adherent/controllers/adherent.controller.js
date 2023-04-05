const adherentService = require("../services/adherent.service");

function getAdherent(_req, res) {
    res.send(adherentService.selectData());
}

module.exports = {
    getAdherent
}