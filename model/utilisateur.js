class Utilisateur {
    /**
     * @param {Number} id - INT
     * @param {Boolean} compte_valide - BOOLEAN
     * @param {String} adherent_id - INT
     */
    constructor(id, compte_valide, adherent_id){
        this.id = id
        this.compte_valide = compte_valide
        this.adherent_id = adherent_id
    }
}

module.exports = {
    Utilisateur
}

