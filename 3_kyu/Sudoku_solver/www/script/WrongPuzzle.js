class WrongPuzzle extends Error {

    constructor(message, ...args) {
        super(message, ...args);
    }
    toString() {
        return this.message
    }

}
