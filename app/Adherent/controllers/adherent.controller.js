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

/**
 * This function posts a new adherent with the provided email, password, and role to the database and
 * returns the result.
 * @param req - req stands for request and it is an object that contains information about the HTTP
 * request that was made. It includes information such as the request method, headers, URL, and body.
 * In this case, the body of the request contains the email, mot_de_passe, and role parameters.
 * @param res - `res` is the response object that is sent back to the client after the server has
 * processed the request. It contains information such as the status code, headers, and response body.
 * @returns {Adherent[]} The id Adherent save
 */
async function postAdherent(req, res) {
    const {email, mot_de_passe, role} = req.body
    res.send(adherentService.insertData(email, mot_de_passe, role));
}


module.exports = {
    getAdherent,
    postAdherent
}