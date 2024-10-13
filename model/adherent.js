const Roles = require('./../enums/roles');

/**
 * La classe Adherent.
 */
class Adherent {
    /**
     * INT
     * @type {string } L'identifiant de l'adhérent 
     */
    id
    /**
     * VARCHAR(50)
     * @type {String} Le nom de l'adhérent.
     */
    nom
    /**
     * VARCHAR(50)
     * @type {String} Le prénom de l'adhérent.
     */
    prenom
    /**
     * VARCHAR(100)
     * @type {String} L'adresse email de l'adhérent.
     */
    email
    /**
     * VARCHAR(100)
     * @type {String} Le mot de passe de l'adhérent.
     */
    mot_de_passe
    /**
     * VARCHAR(20)
     * @type {Roles} Le rôle de l'adhérent. Doit être une des valeurs de l'énumération Roles.
     */
    role
    /**
     * DATE
     * @type {Date} La date d'inscription de l'adhérent.
     */
    date_inscription
}

module.exports = {
    Adherent
}

