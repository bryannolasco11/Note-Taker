
// require dependencies
const express = require('express');
const notes = require('./db/db.json');
const fs = require('fs')
const path = require ('path');

const uniqid = require('uniqid');

// require route
//const apiRoutes = require('./routes/apiRoutes');
//const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
// creates an express server
const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// creates a route for front end request
app.get('/api/notes', (req, res) => {
     let results = notes;
     console.log(req.query)
     res.json(results);
});

// post should create a new note
// give it a unique id
// then write it to the db.json file
// give response to the user
app.post('/api/notes', (req, res) => {
    console.log(req.body);
    // add id to note

    
    // add note to json file and notes array in this function
    const note = createNewNote(req.body, notes);
    
    res.json(note);
});

function createNewNote(body, notesArray) {
    // adds a unique ID
    let newNote = {
        title: body.title,
        text: body.text,
        id: uniqid()
    };
    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}


      


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});