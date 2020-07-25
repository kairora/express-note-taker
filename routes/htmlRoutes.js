const path = require("path")

// exports
module.exports = function(app) {
    // creates a route for the notes.html
    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"))        
    })
    
    // sends users to the home page by default if the other routes specified are not typed in
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"))        
    })
}