
// require dependencies
const express = require('express');
const { notes } = require('./db/db.json');
const fs = require('fs')

// require route
//const apiRoutes = require('./routes/apiRoutes');
//const htmlRoutes = require('./routes/htmlRoutes');
const PORT = process.env.PORT || 3001;
// creates an express server
const app = express();

// creates a route for front end request
app.get('/api/notes', (req, res) => {
     let results = notes;
     console.log(req.query)
     res.json(results);
});

app.post('/animals', (req, res) => {
    
})


      


app.listen(port, () => {
    console.log(`API server now on port ${PORT}!`);
});