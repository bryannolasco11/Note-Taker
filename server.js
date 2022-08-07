
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
// makes the files a static resource
app.use(express.static('public'));

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
    
    // add note to json file and notes array in this function
    
    
    if (!validateNote(req.body)) {
        res.status(400).send('The note is not properly formatted.');
    } else {
        const note = createNewNote(req.body, notes);
        res.json(note);
    }   
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

function validateNote(note) {
    if(!note.title || typeof note.name !== 'string') {
        return false;
    }
    if (!note.text || typeof note.text !== 'string') {
        return false;
    }
    return true;
}
      
// routes for the HTML
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public/index.html'));
// }); // I have no clue what this does

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});