var mongoose = require("mongoose");
var Schema = mongoose.Schema;
module.exports.Song = require('./song.js');

var Song = require('./song');

var AlbumSchema = new Schema({
 name: String,
 artistName: String,
 releaseDate: String,
 genres: [String],
 song: [Song.schema]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
