const path = require('path');
const router = require('express').Router();



// routes for the HTML
router.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, '../../public/notes.html'));
});

// Wildcard route.  If client makes request that doesn't exist,
// it goes to this page.
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });

module.exports = router;
