const { Adherent } = require("../../../model/adherent");

require("dotenv-expand").expand(require("dotenv").config());
const sqlite3 = require('sqlite3').verbose();

/**
 * This function selects all data from a table Adherent.
 * @returns {Promise<Adherent[]>} An async function that returns a Promise 
 * If there is an error, the Promise rejects with the error object.
 */
async function selectData() {
  return new Promise((resolve, reject) => {
    // Open database file
    let db = new sqlite3.Database(process.env.ROUTE_MY_DATABASE, sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        reject(err);
      } else {
        db.all('SELECT * FROM Adherent', [], (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          // Close database file
          db.close();
        });
      }
    });
  });
}


module.exports = {
  selectData
};
