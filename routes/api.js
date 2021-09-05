const router = require("express").Router();
const {v4 : uuidv4} = require('uuid')
const fs = require('fs');

router.get('/notes/', (req, res) => {
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
        id: uuidv4()
    }
    const newNoteArry = noteArry.concat(noteObj);
    fs.writeFileSync("db.json", JSON.stringify(newNoteArry))
    // res.json(newNoteArry);
    res.redirect('/notes');
})

router.delete("/notes/:id", function (req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId)
    fs.readFile("db.json", 'utf8', function (error, notes) {
      if (error) {
        return console.log(error)
      }
      notes = JSON.parse(notes)
  
      notes = notes.filter(val => val.id !== noteId)
  
      fs.writeFile("db.json", JSON.stringify(notes), function (error, data) {
        if (error) {
          return error
        }
        res.json(notes)
      })
    })
  })





module.exports = router;