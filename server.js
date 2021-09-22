const bodyParser = require("body-parser");

const express = require("express");

const app = express();

app.use(bodyParser.urlencoded( {extended: true} ));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/home.html");
});

app.listen(3000, function() {
    console.log("Server is running at 3000");
});



