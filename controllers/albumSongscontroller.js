var db = require('../models');

// app.post('/api/albums/:album_id/songs', function(req, res) {
//   db.Song.create({id: req.params.id}, function(err, song) {
//     if (err) {return console.log("song create err... :", err)};
//
//   })
//
// })



// POST '/api/albums/:albumId/songs'
function create(req, res) {
 db.Album.findById(req.params.albumId, function(err, foundAlbum) {
   console.log(req.body);
   var newSong = new db.Song(req.body);  // dangerous, in a real app we'd validate the incoming data
   foundAlbum.song.push(newSong);
   foundAlbum.save(function(err, savedAlbum) {
     console.log('newSong created: ', newSong);
     res.json(newSong);  // responding with just the song, some APIs may respond with the parent object (Album in this case)
   });
 });
}


module.exports = {
 create: create
};
