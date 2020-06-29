module.exports = class Historic {
    id;
    userId;
    textA;
    textB;
    result;
    date;
    foundIndexes;
    isDelete;

    constructor(id, userId, textA, textB, result, date, foundIndexes){
        this.id = id;
        this.userId = userId;
        this.textA = textA;
        this.textB = textB;
        this.result = result;
        this.date = date;
        this.foundIndexes = foundIndexes;
        this.isDelete = false;
    }
}