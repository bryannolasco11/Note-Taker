
// require dependencies
const express = require('express');
const PORT = process.env.PORT || 3001;
// creates an express server
const app = express();


//require routes
const apiRoutes = require('./routes/apiRoutes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes/htmlRoutes');

const uniqid = require('uniqid');



// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// makes the files a static resource
app.use(express.static('public'));

// require routes file
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});