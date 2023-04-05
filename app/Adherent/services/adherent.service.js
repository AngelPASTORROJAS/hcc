require("dotenv-expand").expand(require("dotenv").config());
const sqlite3 = require('sqlite3').verbose();

// Fonction de sélection
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
