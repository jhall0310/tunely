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
  // FILL ME IN !
}

function destroy(req, res) {
  // FILL ME IN !
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
