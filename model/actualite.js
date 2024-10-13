class Actualite {
    /**
     * @param {Number} id - INT
     * @param {String} titre - VARCHAR(100) NOT NULL
     * @param {String} contenu - TEXT NOT NULL
     * @param {Number} auteur_id - INT NOT NULL
     */
    constructor(id, titre, contenu, auteur_id){
        this.id = id
        this.titre = titre
        this.contenu = contenu
        this.auteur_id = auteur_id
    }
}

module.exports = {
    Actualite
}

