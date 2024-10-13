class Match {
    /**
     * @param {Number} id - INT
     * @param {Date} date_match - DATETIME NOT NULL
     * @param {Number} score_domicile - INT NOT NULL
     * @param {Number} score_visiteur - INT NOT NULL
     */
    constructor(id, date_match, score_domicile, score_visiteur){
        this.id = id
        this.date_match = date_match
        this.score_domicile = score_domicile
        this.score_visiteur = score_visiteur
    }
}

module.exports = {
    Match
}

