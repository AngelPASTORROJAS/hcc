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
      this.db.run(
        `CREATE TABLE IF NOT EXISTS adherents (
          id INT NOT NULL PRIMARY KEY,
          nom VARCHAR(50) NOT NULL,
          prenom VARCHAR(50) NOT NULL,
          email VARCHAR(100) NOT NULL UNIQUE,
          mot_de_passe VARCHAR(100) NOT NULL,
          role VARCHAR(20) NOT NULL,
          date_inscription DATE NOT NULL
        );`
      );

      this.db.run(
        `CREATE TABLE IF NOT EXISTS utilisateurs (
          id INT NOT NULL PRIMARY KEY,
          compte_valide BOOLEAN NOT NULL,
          adherent_id INT NOT NULL,
          FOREIGN KEY (adherent_id) REFERENCES adherents(id)
        );`
      );

      this.db.run(
        `CREATE TABLE IF NOT EXISTS actualites (
          id INT NOT NULL PRIMARY KEY,
          titre VARCHAR(100) NOT NULL,
          contenu TEXT NOT NULL,
          auteur_id INT NOT NULL,
          FOREIGN KEY (auteur_id) REFERENCES adherents(id)
        );`
      );

      this.db.run(
        `CREATE TABLE IF NOT EXISTS matchs (
          id INT NOT NULL PRIMARY KEY,
          date_match DATETIME NOT NULL,
          score_domicile INT NOT NULL,
          score_visiteur INT NOT NULL
        );`
      );

      this.db.run(
        `CREATE TABLE IF NOT EXISTS participations (
          joueur_id INT NOT NULL,
          match_id INT NOT NULL,
          PRIMARY KEY (joueur_id, match_id),
          FOREIGN KEY (joueur_id) REFERENCES adherents(id),
          FOREIGN KEY (match_id) REFERENCES matchs(id)
        );`
      )
    });
  }
}

module.exports = DatabaseBuilder;
