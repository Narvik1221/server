const { log } = require("console");
const express = require("express");
let morgan = require("morgan");
const path = require("path");
const app = express();
const fs = require("fs");
app.set("view engine", "ejs");
const PORT = 3021;
let posts = [];

const createPath = (page) =>
  path.resolve(__dirname, "ejs-pages", `${page}.ejs`);
app.listen(PORT, "localhost", (error) => {
  error ? log(error) : log("listening port " + PORT);
});

app.use(
  morgan(":method :url :status :res[content-lenght] - :response-time ms")
);
app.use(express.urlencoded({ extended: false }));

app.use(express.static(__dirname + "/ejs-pages"));

app.get("/", (req, res) => {
  res.render(createPath("/posts"));
});

app.get("/posts/:id", (req, res) => {
  const id = req.params.id;
  let data = fs.readFileSync("posts.json");

  let posts = JSON.parse(data);
  let post = {};
  posts.forEach((element) => {
    element.id === id ? (post = element) : "";
  });
  log("post", post);
  res.render(createPath("post"), { post });
});

app.delete("/posts/:id", (req, res) => {
  var data = fs.readFileSync("posts.json");
  var myObject = JSON.parse(data);
  let id = req.params.id;
  let pos = myObject.map((i) => i.id).indexOf(id);
  console.log("pos", pos);
  console.log("id", id);
  if (pos !== -1) {
    myObject.splice(pos, 1);
    console.log("obj", myObject);
    var newData = JSON.stringify(myObject, null, 2);
    var posts = JSON.parse(data);

    fs.writeFileSync("posts.json", newData, (err) => {
      // error checking
      if (err) throw err;
      console.log("New data added");
    });
  }
  res.redirect(request.get("/posts"));
});

app.get("/posts", (req, res) => {
  try {
    let data = fs.readFileSync("posts.json");
    let posts = JSON.parse(data);
    console.log("p", posts);
  } catch (err) {
    createFile();
  }
  let data = fs.readFileSync("posts.json");
    let posts = JSON.parse(data);
    console.log("p", posts);
  
  res.render(createPath("posts"), { posts });
});

app.post("/add-post", (req, res) => {
  const { title, text, id, author } = req.body;
  const post = {
    date: new Date(),
    title,
    text,
    id: new Date(),
    author,
  };

  console.log(post);
  posts = [...posts, post];
  console.log("posts!", posts);
  saveToJSON(post);
  res.render(createPath("post"), { post });
});
app.get("/add-post", (req, res) => {
  res.render(createPath("add-post"));
});

app.use((req, res) => {
  res.status = 404;
  res.render(createPath("error"));
});

const saveToJSON = (post) => {
  var data = fs.readFileSync("posts.json");
  var myObject = JSON.parse(data);
  myObject.unshift(post);
  var newData = JSON.stringify(myObject, null, 2);
  log(newData)
  fs.writeFileSync("posts.json", newData, (err) => {
    if (err) throw err;
    console.log("New data added");
  });

};

const createFile = () => {
  fs.writeFileSync("posts.json", "[]", (err) => {
    if (err) throw err;
    console.log("New data added");
  });
};
