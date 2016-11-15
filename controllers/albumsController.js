/************
 * DATABASE *
 ************/

var db = require('../models');



// GET /api/albums
function index(req, res) {
  db.Album.find(function(err, album){
    if (err) {
      return console.log(err);
    }

    res.json(album);
  });


}

function create(req, res) {
  var newAlbum = new db.Album(req.body);
  newAlbum.save(function(err, album){
    if(err){
      console.error(err);
    }
    console.log(album);
    res.json(album);
  });

}

function show(req, res) {
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    if(err) { console.log('albumsController.show error', err); }
    console.log('albumsController.show responding with', foundAlbum);
    res.json(foundAlbum);
  });
}

function destroy(req, res) {
  db.Album.findOneAndRemove({ _id: req.params.albumId }, function(err, foundAlbum){
    // note you could send just send 204, but we're sending 200 and the deleted entity
    res.json(foundAlbum);
  });
}


function update(req, res) {
  console.log('updating with data', req.body);
  db.Album.findById(req.params.albumId, function(err, foundAlbum) {
    if(err) { console.log('albumsController.update error', err); }
    foundAlbum.artistName = req.body.artistName;
    foundAlbum.name = req.body.name;
    foundAlbum.releaseDate = req.body.releaseDate;
    foundAlbum.save(function(err, savedAlbum) {
      if(err) { console.log('saving altered album failed'); }
      res.json(savedAlbum);
    });
  });

}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
