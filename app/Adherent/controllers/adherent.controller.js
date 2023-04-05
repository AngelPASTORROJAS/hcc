const adherentService = require("../services/adherent.service");

async function getAdherent(_req, res) {
    res.send(await adherentService.selectData());
}

module.exports = {
    getAdherent
}