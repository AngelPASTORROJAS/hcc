const Roles = require("../../../enums/roles");
const { Adherent } = require("../../../model/adherent");

require("dotenv-expand").expand(require("dotenv").config());
const sqlite3 = require("sqlite3").verbose();

//#region -- Entities --

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
      sqlite3.OPEN_READONLY,
      (err) => {
        if (err) {
          reject(err);
        } else {
          db.all("SELECT * FROM adherents;", [], (err, rows) => {
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

//#endregion

//#region -- ROLLBACK --

/**
 * Exécute une commande SQL avec rollback en cas d'erreur.
 * @param {Object} db - L'objet de base de données SQLite3.
 * @param {string} sql - La commande SQL à exécuter.
 * @param {Array} params - Les paramètres à passer à la commande SQL.
 * @param {Function} callback - La fonction qui sera appelée avec l'erreur en cas d'échec de la commande SQL.
 */
function runSqlWithRollback(db, sql, params, callback) {
  db.run(sql, params, function (err) {
    if (err) {
      db.run("ROLLBACK", function (rollErr) {
        if (rollErr) {
          callback(rollErr);
        } else {
          callback(err);
        }
      });
    } else {
      callback(null);
    }
  });
}

/**
 * Confirme une transaction et ferme la base de données.
 * @param {Object} db - L'objet de base de données SQLite3.
 * @param {Function} resolve - La fonction qui résout la promesse avec un message de confirmation.
 * @param {string} message - Le message de confirmation à passer à la fonction de résolution.
 */
function commitAndClose(db, resolve, message) {
  db.run("COMMIT", function (commitErr) {
    if (commitErr) {
      reject(commitErr);
    } else {
      db.close();
      resolve(message);
    }
  });
}

/**
 * Annule une transaction, ferme la base de données et rejette une promesse avec une erreur.
 * @param {Object} db - L'objet de base de données SQLite3.
 * @param {Function} reject - La fonction qui rejette la promesse avec une erreur.
 * @param {Error} err - L'erreur à passer à la fonction de rejet.
 */
function rollbackAndClose(db, reject, err) {
  db.run("ROLLBACK", function (rollErr) {
    if (rollErr) {
      reject(rollErr);
    } else {
      db.close();
      reject(err);
    }
  });
}

//#endregion

//#region  -- Utilisateur --

/**
 * Crée un nouvel adhérent dans la base de données.
 * @param {string} nom - Le nom de l'adhérent.
 * @param {string} prenom - Le prénom de l'adhérent.
 * @param {string} email - L'adresse email de l'adhérent.
 * @param {string} mot_de_passe - Le mot de passe de l'adhérent.
 * @returns {Promise<string>} Une promesse qui se résout avec un message de confirmation si l'adhérent est créé avec succès, ou qui est rejetée avec une erreur si une erreur se produit.
 */
async function createAdherent(nom, prenom, email, mot_de_passe) {
  return new Promise((resolve, reject) => {
    // Ouvrir le fichier de base de données
    let db = new sqlite3.Database(
      process.env.ROUTE_MY_DATABASE,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          // Commencer une transaction
          db.run("BEGIN TRANSACTION", function (err) {
            if (err) {
              reject(err);
            } else {
              // Insérer l'adhérent dans la table "adherents"
              const insert_adherent =
                "INSERT INTO adherents (nom, prenom, email, mot_de_passe, date_inscription) VALUES (?, ?, ?, ?, datetime('now'));";
              const adherent_params = [nom, prenom, email, mot_de_passe];
              runSqlWithRollback(
                db,
                insert_adherent,
                adherent_params,
                function (adherentErr) {
                  if (adherentErr) {
                    // Annuler la transaction en cas d'erreur
                    rollbackAndClose(db, reject, adherentErr);
                  } else {
                    // Insérer l'adhérent dans la table "utilisateurs"
                    const insert_utilisateur =
                      "INSERT INTO utilisateurs (compte_valide, adherent_id) VALUES (0, ?);";
                    const utilisateur_params = [this.lastID];
                    runSqlWithRollback(
                      db,
                      insert_utilisateur,
                      utilisateur_params,
                      function (utilisateurErr) {
                        if (utilisateurErr) {
                          // Annuler la transaction en cas d'erreur
                          rollbackAndClose(db, reject, utilisateurErr);
                        } else {
                          // Confirmer la transaction en cas de succès
                          commitAndClose(
                            db,
                            resolve,
                            "L'adhérent a bien été inscrit, il est en attente de validation."
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      }
    );
  });
}

//#endregion

//#region -- Admin --

/**
 * Valide le compte d'un adhérent dans la base de données et met à jour son rôle.
 * @param {Object} adherent - L'objet représentant l'utilisateur connecté.
 * @param {number} id_adherent_a_valider - L'identifiant de l'adhérent à valider.
 * @param {string} role - Le rôle à attribuer à l'adhérent validé.
 * @returns {Promise<string>} Une promesse qui se résout avec un message de confirmation si le compte est validé avec succès, ou qui est rejetée avec une erreur si une erreur se produit.
 */
async function validerAdherent(adherent, id_adherent_a_valider, role) {
  return new Promise((resolve, reject) => {
    // Vérifier que l'utilisateur connecté est un administrateur
    if (adherent.role !== Roles.ADMIN) {
      reject("Vous n'êtes pas autorisé à valider un compte adhérent.");
    }
    // Ouvrir le fichier de base de données
    let db = new sqlite3.Database(
      process.env.ROUTE_MY_DATABASE,
      sqlite3.OPEN_READWRITE,
      (err) => {
        if (err) {
          reject(err);
        } else {
          // Commencer une transaction
          db.run("BEGIN TRANSACTION", function (err) {
            if (err) {
              reject(err);
            } else {
              // Mettre à jour le compte adhérent dans la table "utilisateurs"
              const update_utilisateur =
                "UPDATE utilisateurs SET compte_valide = 1 WHERE adherent_id = ?;";
              const utilisateur_params = [id_adherent_a_valider];
              runSqlWithRollback(
                db,
                update_utilisateur,
                utilisateur_params,
                function (utilisateurErr) {
                  if (utilisateurErr) {
                    // Annuler la transaction en cas d'erreur
                    rollbackAndClose(db, reject, utilisateurErr);
                  } else {
                    // Mettre à jour le rôle de l'adhérent dans la table "adherents"
                    const update_adherent =
                      "UPDATE adherents SET role = ? WHERE adherent_id = ?;";
                    const adherent_params = [role, id_adherent_a_valider];
                    runSqlWithRollback(
                      db,
                      update_adherent,
                      adherent_params,
                      function (adherentErr) {
                        if (adherentErr) {
                          // Annuler la transaction en cas d'erreur
                          rollbackAndClose(db, reject, adherentErr);
                        } else {
                          // Confirmer la transaction en cas de succès
                          commitAndClose(
                            db,
                            resolve,
                            "Le compte adhérent a bien été validé."
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      }
    );
  });
}

//#endregion

/**
 * TODO: Seuls les adhérents ayant le rôle « joueur » peuvent s’inscrire aux matchs
 */

/**
 * TODO: Seuls les adhérents ayant le rôle « joueur » peuvent s’inscrire aux matchs
 */
//inscrireAuMatch(adherent,id_match)

/**
 * TODO: Les adhérents peuvent s’inscrire à plusieurs matchs
 */
//inscrireAuxMatchs(adherents,ids_match)

/**
 * TODO: Les adhérents peuvent se désinscrire des matchs auxquels il se sont inscrits.
 */
//desinscrireAuxMatchs(adherents,ids_match)

/**
 * TODO: L’API doit être capable de retourner les infos de l’ensemble des adhérents (nom, prénom, date d’inscription, matchs auxquels ils participent)
 */

/**
 * TODO: L’API doit être capable de retourner les infos d’un adhérent particulier (nom, prénom, date d’inscription, matchs auxquels il participe)
 */

module.exports = {
  selectData,
  createAdherent,
  validerAdherent,
};
