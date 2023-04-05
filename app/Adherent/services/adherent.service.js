const { Adherent } = require("../../../model/adherent");

require("dotenv-expand").expand(require("dotenv").config());
const sqlite3 = require("sqlite3").verbose();

/**
 * This function selects all data from a table Adherent.
 * @returns {Promise<Adherent[]>} An async function that returns a Promise
 * If there is an error, the Promise rejects with the error object.
 */
async function selectData() {
  return new Promise((resolve, reject) => {
    // Open database file
    let db = new sqlite3.Database(
      process.env.ROUTE_MY_DATABASE,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          db.all("SELECT * FROM Adherent", [], (err, rows) => {
            if (err) {
              reject(err);
            } else {
              resolve(rows);
            }
            // Close database file
            db.close();
          });
        }
      }
    );
  });
}

/**
 * This function insert Adherent.
 * @param {String} email - The email parameter is a string that represents the email address of the
 * adherent.
 * @param {String} mot_de_passe - the password of the adherent (member) object being created.
 * @param {String} role - The "role" parameter in the constructor is used to define the role or position of the adherent in the system.
 * It could be a user, admin, moderator, or any other role that is relevant to the system.
 * @returns {Number} An async function that returns a Promise 
 * If there is an error, the Promise rejects with the error object.
 */
async function insertData(email, mot_de_passe, role) {
  return new Promise((resolve, reject) => {
    // Open database file
    let db = new sqlite3.Database(
      process.env.ROUTE_MY_DATABASE,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          const sql =
            "INSERT INTO Adherent (email, mot_de_passe, role) VALUES (?, ?, ?)";
          db.run(sql, [email, mot_de_passe, role], function (err) {
            if (err) {
              reject(err);
            } else {
              // getDataById(this.lastID);
              resolve(this.lastID);
            }
            // Close database file
            db.close();
          });
        }
      }
    );
  });
}

module.exports = {
  selectData,
  insertData
};
