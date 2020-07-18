const express = require('express');
const app = express();
const { db } = require('./db/db');
const path = require('path');


// app.get('/db/db', (req, res) => {
//     res.json(db);
// });

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});