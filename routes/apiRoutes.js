const fs = require("fs")
let myDB = require("../db/db.json")
const path = require("path")




// export
module.exports = function(app) {

    const readDB =  JSON.parse(fs.readFileSync(path.join(__dirname, "../db/db.json"), (err, data) => {
            if (err) throw err;
        }));
 
    // gets the correct data from the database when user visits the route
    app.get("/api/notes", function(req, res) {
       return res.json(readDB);
       console.log(typeof readDB)
    })

    const writeUserNote = function(note) {
        fs.writeFileSync(path.join(__dirname, "../db/db.json"), JSON.stringify(note), (err, data) => {
        if (err) throw err;
        })
    }

    app.post("/api/notes", function(req, res) {
        let userNote = req.body;
        readDB.push(userNote);
        writeUserNote(readDB);
        return res.json(readDB)

     })



}