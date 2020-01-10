const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class NotesDataHandler {
    constructor(){
    }

    readNotesData(){
        return readFileAsync("db/notesData.json", "utf8")
        .then(notes => {
            return JSON.parse(notes);
        });
    }

    saveNewNote(newNotes) {
        return writeFileAsync("db/notesData.json", JSON.stringify(newNotes))
    }
}

module.exports = NotesDataHandler;