const sqlite3 = require("sqlite3").verbose();

class DatabaseBuilder {
  /**
   * This is a constructor function that creates a new instance of a SQLite3 database and returns it.
   * @param filename - The filename parameter is a string that represents the name of the SQLite
   * database file that will be created or opened. It is used to initialize a new instance of the
   * sqlite3.Database class.
   * @returns The `this.db` object is being returned.
   */
  constructor(filename) {
    this.db = new sqlite3.Database(filename);
    this.build();
    return this.db;
  }

  build() {
    this.db.serialize(() => {
      /**
       * This code is creating a new table named "Adherent" in the SQLite3 database.
       * he table has four columns:
       * "id_adherent" which is an auto-incrementing integer and the primary key of the table,
       * "email" which is a string of maximum length 255 characters,
       * "mot_de_passe" which is a string of maximum length 255 characters,
       * "role" which is a string of maximum length 255 characters.
       * The "IF NOT EXISTS" clause ensures that the table is only created if it does not already exist in the database.
       */
      this.db.run(
        "CREATE TABLE IF NOT EXISTS Adherent (id_adherent INTEGER PRIMARY KEY AUTOINCREMENT, email VARCHAR(255), mot_de_passe VARCHAR(255), role VARCHAR(255));"
      );

      /**
       * This code is creating a new table named "Validation" in the SQLite3 database. 
       * The table has four columns:
       * "id_validation" which is an auto-incrementing integer and the primary key of the table,
       * "date_validation" which is a date data type,
       * "statut" which is a string of maximum length 255 characters,
       * "id_adherent" which is a foreign key that references the "id_adherent" column in the "Adherent" table.
       * The "IF NOT EXISTS" clause ensures that the table is only created if it does not already exist in the database.
       */
      this.db.run(
        "CREATE TABLE IF NOT EXISTS Validation (id_validation INTEGER PRIMARY KEY AUTOINCREMENT,date_validation DATE,statut VARCHAR(255),id_adherent INT REFERENCES Adherent (id_adherent));"
      );

      /**
       * This code is creating a new table named "Match" in the SQLite3 database. The table has five columns:
       * "id_match" which is an auto-incrementing integer and the primary key of the table,
       * "date_match" which is a date data type, "adversaire" which is a string of maximum length 255 characters,
       * "score_final" which is a string of maximum length 255 characters,
       * "id_adherent" which is a foreign key that references the "id_adherent" column in the "Adherent" table.
       * The "IF NOT EXISTS" clause ensures that the table is only created if it does not already exist in the database.
      */
      this.db.run(
        "CREATE TABLE IF NOT EXISTS Match ( id_match INTEGER PRIMARY KEY AUTOINCREMENT, date_match DATE, adversaire VARCHAR(255), score_final VARCHAR(255), id_adherent INT REFERENCES Adherent (id_adherent));"
      );

      /**
       * This code is creating a new table named "Inscription" in the SQLite3 database. 
       * The table has three columns:
       * "id_inscription" which is an auto-incrementing integer and the primary key of the table,
       * "id_adherent" which is a foreign key that references the "id_adherent" column in the "Adherent" table,
       * "id_match" which is a foreign key that references the "id_match" column in the "Match" table.
       * The "IF NOT EXISTS" clause ensures that the table is only created if it does not already exist in the database.
       */
      this.db.run(
        "CREATE TABLE IF NOT EXISTS Inscription ( id_inscription INTEGER PRIMARY KEY AUTOINCREMENT, id_adherent INT REFERENCES Adherent (id_adherent), id_match INT REFERENCES Match (id_match));"
      );
    });
  }
}

module.exports = DatabaseBuilder;
