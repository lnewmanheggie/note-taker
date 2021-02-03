const express = require("express");
const path = require("path");
const fs = require("fs")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/api/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});

app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    let rawData = fs.readFileSync(__dirname + "/db/db.json");
    let result = JSON.parse(rawData);
    newNote.id = result.length + 1;
    result.push(newNote)
    res.json(newNote);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(result), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    })
});

app.delete("/api/notes/:id", function(req, res) {
    let chosenId = req.params.id;
    let rawData = fs.readFileSync(__dirname + "/db/db.json");
    let result = JSON.parse(rawData);
    for (let i = 0; i < result.length; i++) {
        if (chosenId == result[i].id) {
            result.splice(i, 1);
        }
    }
    res.json(result);
    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(result), 'utf-8', function(err) {
        if (err) throw err
        console.log('Done!')
    })
})


app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});