require("dotenv-expand").expand(require("dotenv").config());

/**
 * Une énumération des rôles disponibles pour les adhérents.
 */
class Roles {
  /**
   * Le rôle administrateur.
   * @type {string}
   */
  static ADMIN = process.env.ADMIN;

  /**
   * Le rôle joueur.
   * @type {string}
   */
  static JOUEUR = process.env.JOUEUR;

  /**
   * Le rôle coach.
   * @type {string}
   */
  static COACH = process.env.COACH;

  /**
   * Le rôle contributeur.
   * @type {string}
   */
  static CONTRIBUTEUR = process.env.CONTRIBUTEUR;
}

module.exports = Roles;
