const router = require("express").Router();

const fs = require('fs');
router.get('/notes', (req, res) => {
    const notes = fs.readFileSync('db.json', 'utf8');
    const noteArry = JSON.parse(notes)
    res.json(noteArry)
});

router.post('/notes', (req, res) => {
    const notes = fs.readFileSync('db.json', 'utf8');
    const noteArry = JSON.parse(notes)
    const noteObj = {
        title: req.body.title,
        text: req.body.text,
        id: 1
    }
    const newNoteArry = noteArry.concat(noteObj);
    fs.writeFileSync("db.json", JSON.stringify(newNoteArry))
    // res.json(newNoteArry);
    res.redirect('/notes');
})












module.exports = router;