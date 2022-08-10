const fs = require("fs");
const path = require("path");
const uniqid = require('uniqid');

function createNewNote(body, notesArray) {
    // adds a unique ID
    let newNote = {
        title: body.title,
        text: body.text,
        id: uniqid()
    };
    notesArray.push(newNote);
    console.log(notesArray);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
};

// function to go through the array and match id to delete
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];
        // for loop to see which file matches the id
        if (note.id === id) {
            // seperates the id
            notesArray.splice(i, 1);
            // re-write the file
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notesArray, null, 2),
            );
            break;
        }
    }
};

module.exports = {
    createNewNote,
    deleteNote
};