const express = require("express");
const multer = require("multer")
const router = express.Router();
const Song = require("../model/Song");

var storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

var upload = multer({ storage: storage });

router.get("/", (req, res) => {
    res.render("regmusic")
});

router.post("/",  upload.fields([
    { name: "cover"},
    { name: "song"}
  ]), async(req, res) => {
    try {
        if (!req.files?.cover?.[0] || !req.files?.song?.[0]) {
          return res.status(400).send("Please upload both cover and song");
        }

        const data = {
            ...req.body,                  
            cover: req.files ? `/uploads/${req.files.cover[0].filename}` : null,
            song: req.files ? `/uploads/${req.files.song[0].filename}` : null      
        };

        const song = new Song(data);
        await song.save();
        res.redirect("/");
    } catch (error) {
         console.error(error);
        res.redirect("/");
    }
});

router.get("/api/songs", async (req, res) => {
  try {
    const songs = await Song.find();
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch songs" });
  }
});

module.exports = router;