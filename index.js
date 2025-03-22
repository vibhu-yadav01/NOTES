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


let notes = [
    {
        id: uuidv4(),
        username: "DEMO",
        content: "This is the demo note, To create new note tap on + icon "
    },
]

app.get("/notes", (req, res)=>{
    res.render("index.ejs", {notes});
});

app.get("/notes/new", (req, res)=>{
    res.render("new.ejs");
});

app.post("/notes", (req, res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    notes.push({id, username, content});
    res.redirect("/notes")
});

app.get("/notes/:id", (req, res) => {
    let { id } = req.params;
    let note = notes.find((p) => id === p.id);
    
    if (!note) {
        return res.status(404).send("Post not found");
    }

    res.render("show.ejs", { note });
});


app.patch("/notes/:id", (req, res)=>{
    let { id }=  req.params;
    let newContent = req.body.content;
    let note = notes.find((p) => id == p.id);
    note.content = newContent;
    console.log(note);
    res.redirect("/notes");

});

app.get("/notes/:id/edit", (req, res)=>{
    let { id }=  req.params;
    let note = notes.find((p) => id == p.id);
    res.render("edit.ejs", { note});
})

app.delete("/notes/:id",(req, res)=>{
    let { id } = req.params;
    notes = notes.filter((p) => id != p.id);
    res.redirect("/notes");
})

app.listen(port, ()=>{
    console.log("listeing to port : 8080");
    
})