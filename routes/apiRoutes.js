const path = require("path");
const fs = require("fs");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../db/db.json"));
    });
    
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        let rawData = fs.readFileSync(path.join(__dirname, "../db/db.json"));
        let result = JSON.parse(rawData);
        newNote.id = result.length + 1;
        result.push(newNote)
        res.json(newNote);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(result), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    });
    
    app.delete("/api/notes/:id", function(req, res) {
        let chosenId = req.params.id;
        let rawData = fs.readFileSync(path.join(__dirname, "../db/db.json"));
        let result = JSON.parse(rawData);
        for (let i = 0; i < result.length; i++) {
            if (chosenId == result[i].id) {
                result.splice(i, 1);
            }
        }
        res.json(result);
        fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(result), 'utf-8', function(err) {
            if (err) throw err
            console.log('Done!')
        })
    })
}