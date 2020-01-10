const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/api/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Tells node that we are creating an "express" server
const app = express();

const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/notes", apiRoutes);
app.use("/", htmlRoutes);

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});
