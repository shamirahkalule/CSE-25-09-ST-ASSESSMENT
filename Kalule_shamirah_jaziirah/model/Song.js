const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
    cover: {type: String, required: true},
    title: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    year: {type: Date, required: true},
    song: {type: String, required: true}
});

module.exports = mongoose.models.Song || mongoose.model("Song", songSchema);