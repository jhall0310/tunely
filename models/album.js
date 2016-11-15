var mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports.Song = require('./song.js');


var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [String]
  // songs: [SongSchema]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
