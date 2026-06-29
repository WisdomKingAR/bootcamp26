const express = require("express");
const app = express();

//Create a route such that when user visits / they get sent back a text
app.get("/", (req, res) => {
    res.send("Hello, World!");
});

//Create a route such that when user visits /about they get sent back a text
app.get("/about", (req, res) => {
    res.send("This is the about page");
});

//Create a route such that when user visits /contact they get sent back a text
app.get("/contact", (req, res) => {
    res.send("This is the contact page");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

