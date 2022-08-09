const router = require('express').Router();
const { notes } = require('../../db/db.json');


const { createNewNote, deleteNote } = require('../../lib/notes.js');

// creates a route for front end request
router.get('/api/notes', (req, res) => {
    let results = notes;
    console.log(req.query)
    res.json(results);
});

// deletes a note by id
router.delete('/api/notes/:id', function (req, res) {
    deleteNote(req.params.id, notes);
    res.json(true);
 });

// post should create a new note
// give it a unique id
// then write it to the db.json file
// give response to the user
router.post('/api/notes', (req, res) => {
    console.log(req.body);
// add note to json file and notes array in this function
    const note = createNewNote(req.body, notes);
    res.json(note); 
});



module.exports = router;
