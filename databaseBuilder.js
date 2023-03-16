const sqlite3 = require("sqlite3").verbose();

class DatabaseBuilder {
  /**
   * The constructor function creates a new database object and assigns it to the db property of the
   * class
   * @param {string} filename - The filename of the database.
   */
  constructor(filename) {
    this.db = new sqlite3.Database(filename);
    this.build();
  }

  build() {
    this.db.serialize(() => {
      this.db.run(
        "CREATE TABLE IF NOT EXISTS Adherent (id_adherent INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255), mot_de_passe VARCHAR(255), role VARCHAR(255));"
      );

      this.db.run(
        "CREATE TABLE IF NOT EXISTS Validation (id_validation INTEGER PRIMARY KEY AUTOINCREMENT,date_validation DATE,statut VARCHAR(255),id_adherent INT REFERENCES Adherent (id_adherent));"
      );

      this.db.run(
        "CREATE TABLE IF NOT EXISTS Match ( id_match INTEGER PRIMARY KEY AUTOINCREMENT, date_match DATE, adversaire VARCHAR(255), score_final VARCHAR(255), id_adherent INT REFERENCES Adherent (id_adherent));"
      );

      this.db.run(
        "CREATE TABLE IF NOT EXISTS Inscription ( id_inscription INTEGER PRIMARY KEY AUTOINCREMENT, id_adherent INT REFERENCES Adherent (id_adherent), id_match INT REFERENCES Match (id_match));"
      );
    });
  }
}

module.exports = DatabaseBuilder;