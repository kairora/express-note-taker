const fs = require("fs")
let myDB = require("../db/db.json")
const path = require("path")

// export
module.exports = function(app) {

    // stores the parsed database into a variable to be used later
    let readDB =  JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
        }));
 
    // gets the correct data from the database when user visits the route
    app.get("/api/notes", function(req, res) {
       return res.json(readDB);
      
    })

    // Writes a note the db
    const writeUserNote = function(note) {
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(note), (err, data) => {
        if (err) throw err;
        })
    }

    // Posts the notes to the server from user response and sends it back client-side
    app.post("/api/notes", function(req, res) {
        let userNote = req.body;
        let noteID = parseInt(readDB.length) + 1;
        userNote.id = noteID;
        readDB.push(userNote);
        writeUserNote(readDB);
        return res.json(readDB);
     })

    // enables a user to send a delete request and then delete the note from the db
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