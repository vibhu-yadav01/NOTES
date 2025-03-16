const express = require("express");
const app = express();

const port = 8080;
const path = require("path");
const methodOverride = require("method-override");
const {v4: uuidv4} = require("uuid");


app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname,"public")));


let posts = [
    {
        id: uuidv4(),
        username: "shraddha",
        content: "hello everyone"
    },
    {
        id: uuidv4(),
        username: "shena",
        content: "hello guys"
    },
    {
        id: uuidv4(),
        username: "shikha",
        content: "hello budies"
    },
]

app.get("/posts", (req, res)=>{
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/posts", (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts")
});

app.get("/posts/:id", (req, res)=>{
    let { id }=  req.params;
    let post = posts.find((p) => id == p.id);
    console.log(post);
    res.redirect("show.ejs", {post})
});



app.listen(port, ()=>{
    console.log("listeing to port : 8080");
    
})