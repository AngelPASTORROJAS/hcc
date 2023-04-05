const adherentService = require("../services/adherent.service");

/**
 * This function selects all data from a table Adherent.
 * @param _req - The _req parameter is likely an abbreviation for "request" and is likely an object
 * that contains information about the incoming HTTP request, such as the request method, headers, and
 * any data sent in the request body.
 * @param res - The "res" parameter is an object that represents the HTTP response that will be sent
 * back to the client. It has methods such as "send" that can be used to send data back to the client.
 * @returns {Adherent[]} An async function that returns a list of Adherent
 * If there is an error, the Promise rejects with the error object.
 */
async function getAdherent(_req, res) {
    res.send(await adherentService.selectData());
}

module.exports = {
    getAdherent
}