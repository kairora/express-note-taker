// export
module.exports = function(app) {
 
    // gets the correct data when user visits a route
    app.get("/api/notes", function(req, res) {
        res.json("Hello World")


    })



}