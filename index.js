const express = require("express");
const app = express();

const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require("uuid");


app.use(express.urlencoded({extended : true}));


app.set("view engine", "ejs");
app.set("view",path.join(__dirname, "views"));

app.set(express.static(path.join(__dirname, "public")));


let posts = [
    {
        username: "shraddha",
        content: "hello everyone"
    },
    {
        username: "shena",
        content: "hello guys"
    },
    {
        username: "shikha",
        content: "hello budies"
    },
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
})

app.listen(port, ()=>{
    console.log("listeing to port : 8080");
    
})