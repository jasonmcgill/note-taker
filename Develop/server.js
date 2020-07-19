const express = require('express');
const app = express();
let db = require('./db/db.json');
const path = require('path');
const fs = require('fs');
var uniqid = require('uniqid');
const PORT = process.env.PORT || 3001;


app.use('/static', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/api/notes', (req, res) => {
    res.json(db);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.post('/api/notes', (req, res) => {
    let newNote = {"title": req.body.title, "text": req.body.text, "id": uniqid()}

    db.push(newNote);
    
    fs.writeFile('./db/db.json', JSON.stringify(db), () => {
        res.json(newNote)
    });
    
})


app.delete('/api/notes/:id', (req, res) => {
    let deleteId = req.params.id

    function checkDb(note) {
        return deleteId == note.id
    }

    let foundIndex = db.findIndex(checkDb);

    db.splice(foundIndex, 1);

    fs.writeFile('./db/db.json', JSON.stringify(db), () => {
        res.sendStatus(200);
    });

});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });