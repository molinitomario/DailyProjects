// from flask import Flask
const express = require("express");
const path = require("path");
const fetch = require("node-fetch");
// app = Flask(__name__);
const app = express();

// formatting is ejs, not jinja, not pug... EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// static folder, contains js and css, possibly images too. In this case its convention to name is public
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded( {extended: true} ));

app.get("/", async (req, res) => {
  // will store gifs here.
  let RESULT = [];

  fetch("https://api.giphy.com/v1/gifs/trending?api_key=Do2KvcrIdYyuEJWNE7dKQ7CNOdEYc7Wp&limit=5&")
  .then( async (r) => {
    // awaiting the promise to be fulfilled, so I can get the full data from the server.
    let data = await r.json();
    // extracting the actual data array from the response
    data = data.data; 
    for (const item of data)
    {
      RESULT.push({
        imageUrl: item.images.original.url,
        imageHeight: item.images.original.height,
        imageWidth: item.images.original.width,
        gifTitle: item.title
      });
    }
    res.render("index", {title: "Home", result: RESULT});
  })
  .catch( (e)=>{
    console.log(e);
  });
});


app.post("/", async (req, res) => {
  const { title } = req.body;
  let RESULT = [];

  fetch("https://api.giphy.com/v1/gifs/search?api_key=Do2KvcrIdYyuEJWNE7dKQ7CNOdEYc7Wp&limit=5&q=" + title)
  .then( async (r) => {
    // awaiting the promise to be fulfilled, so I can get the full data from the server.
    let data = await r.json();
    // extracting the actual data array from the response
    data = data.data; 
    for (const item of data)
    {
      RESULT.push({
        imageUrl: item.images.original.url,
        imageHeight: item.images.original.height,
        imageWidth: item.images.original.width,
        gifTitle: item.title
      });
    }
    res.render("index", {title: "Home", result: RESULT});
  })
  .catch( (e)=>{
    console.log(e);
  });
});

app.get("*", (req, res) => {
  res.send("That does not exist....");
});


app.listen(3000, () => {
  console.log("Listening on port 3000");
});
