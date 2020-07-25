const fs = require("fs")
let myDB = require("../db/db.json")
const path = require("path")




// export
module.exports = function(app) {

    let readDB =  JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
        }));
 
    // gets the correct data from the database when user visits the route
    app.get("/api/notes", function(req, res) {
       return res.json(readDB);
      
    })

    const writeUserNote = function(note) {
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(note), (err, data) => {
        if (err) throw err;
        })
    }

    app.post("/api/notes", function(req, res) {
        let userNote = req.body;
        let noteID = parseInt(readDB.length) + 1;
        userNote.id = noteID;
        readDB.push(userNote);
        writeUserNote(readDB);
        return res.json(readDB);
     })

    app.delete("/api/notes/:id", function(req, res) {
        console.log(req.query.id);
        console.log(req.params.id)
        let noteID = req.params.id;
        readDB = readDB.filter((note) => {
            return note.id != req.params.id
        })
        writeUserNote(readDB);
        return res.json(readDB)
            
    })



}