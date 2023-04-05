
class Adherent {
    /**
     * This is a constructor function that creates an object with properties for an adherent's ID, email, password, and role.
     * @param {Number} id_adherent - This parameter represents the unique identifier of an adherent (member) in
     * a system or application. It could be a number or a string that uniquely identifies the member.
     * @param {String} email - The email parameter is a string that represents the email address of the
     * adherent.
     * @param {String} mot_de_passe - "mot_de_passe" is a French term that translates to "password" in English.
     * Therefore, the "mot_de_passe" parameter in the constructor function is used to store the
     * password of the adherent (member) object being created.
     * @param {String} role - The "role" parameter in the constructor is used to define the role or position of
     * the adherent in the system. It could be a user, admin, moderator, or any other role that is
     * relevant to the system.
     */
    constructor(id_adherent, email, mot_de_passe, role){
        this.id_adherent = id_adherent
        this.email = email
        this.mot_de_passe = mot_de_passe
        this.role = role
    }
}

module.exports = {
    Adherent
}

