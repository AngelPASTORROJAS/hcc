class Participation {
    /**
     * @param {Number} id - INT
     * @param {Number} joueur_id - INT NOT NULL
     * @param {Number} match_id - INT NOT NULL
     */
    constructor(id, joueur_id, match_id){
        this.id = id
        this.joueur_id = joueur_id
        this.match_id = match_id
    }
}

module.exports = {
    Participation
}

