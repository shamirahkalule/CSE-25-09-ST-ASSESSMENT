const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const Song = require("./model/song");

const songRoutes = require("./routes/songRoutes");

const app = express();
const port = 3000;

mongoose.connect("mongodb://localhost:27017/songDatabase");
mongoose.connection
  .once("open", () => {
    console.log("Server started")
  })
  .on("error", (error) =>{
    console.error(`connection error: ${error.message}`);
});

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", songRoutes);

app.use((req, res) => {
  res.status(404).send("Oops! page not found.");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Don't worry, something went wrong, but it's on our side.");
});

app.listen(port, () => console.log(`listening on port ${port}`));