
var notesData = require("../db/notesData");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // ---------------------------------------------------------------------------

  app.get("/api/notes", function(req, res) {
    res.json(notesData);
  });

  // API POST Requests
  // ---------------------------------------------------------------------------

  app.post("/api/notes", function(req, res) {
    notesData.push(req.body);
    res.json(false); 
  });
};
