/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */




$(document).ready(function() {
  console.log('app.js loaded!');

  var hb = Handlebars;
  var albumSource = $('#album-template').html();
  var albumTemplate = hb.compile(albumSource);



  function renderAlbum(album) {
    var albumHtml = albumTemplate(album);
  	$('#albums').append(albumHtml);


  }

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: getAlbumSucc,
    error: getAlbumErr
  });
  function getAlbumErr(error){
    console.error(error);
  }

  function getAlbumSucc(json){
    json.forEach(function(ele){
    renderAlbum(ele);
  })
};

$('.form-horizontal').on('submit', function(e){
  e.preventDefault();

  var albumData = $(this).serialize();
  console.log(albumData);
  $.ajax({
    method: 'POST',
    url: '/api/albums',
    data: albumData,
    success: createSucc,
    error: createErr
  });
  function createErr(error){
    console.error(error);
  }

  function createSucc(album){
    $('.clear').val('');
    renderAlbum(album);
  };
location.reload();

});



$('#albums').on('click', '.add-song', function(e) {
    var id= $(this).closest('.album').data('album-id');
    $('#songModal').data('album-id', id);
    $('#songModal').modal();
    $('#saveSong').on('click', function(e){
      console.log('save clicked');
      e.preventDefault();
      var modalData = {
        id: id,
        name: $('#songName').val(),
        trackNumber: $('#trackNumber').val()
      }
      $.ajax({
        method: 'POST',
        url: 'api/albums/'+ id + "/song",
        data: modalData,
        success: newSongSucc,
        error: newSongErr
      })
      function newSongErr(err){
        console.error(err);
      }
      function newSongSucc(json){
        $('.form-control').val('');
        $('#songModal').modal('toggle')
        console.log(json);
        // $('.album').find("[data-album-id='" + id + "']").remove();
        renderAlbum(json);
      }
    });
});



$('#albums').on('click', '.delete-album', handleDeleteAlbumClick);

$('#albums').on('click', '.edit-album', handleAlbumEditClick);
$('#albums').on('click', '.save-album', handleSaveChangesClick);



});


function handleDeleteAlbumClick(e) {
  var albumId = $(this).parents('.album').data('album-id');
  console.log('someone wants to delete album id=' + albumId );
  $.ajax({
    url: '/api/albums/' + albumId,
    method: 'DELETE',
    success: handleDeleteAlbumSuccess
  });
}

// callback after DELETE /api/albums/:id
function handleDeleteAlbumSuccess(data) {
  var deletedAlbumId = data._id;
  console.log('removing the following album from the page:', deletedAlbumId);
  $('div[data-album-id=' + deletedAlbumId + ']').remove();
}


function handleAlbumEditClick(e) {
  var $albumRow = $(this).closest('.album');
  var albumId = $albumRow.data('album-id');
  console.log('edit album', albumId);

  // show the save changes button
  $albumRow.find('.save-album').toggleClass('hidden');
  // hide the edit button
  $albumRow.find('.edit-album').toggleClass('hidden');


  // get the album name and replace its field with an input element
  var albumName = $albumRow.find('span.album-name').text();
  $albumRow.find('span.album-name').html('<input class="edit-album-name" value="' + albumName + '"></input>');

  // get the artist name and replace its field with an input element
  var artistName = $albumRow.find('span.artist-name').text();
  $albumRow.find('span.artist-name').html('<input class="edit-artist-name" value="' + artistName + '"></input>');

  // get the releasedate and replace its field with an input element
  var releaseDate = $albumRow.find('span.album-releaseDate').text();
  $albumRow.find('span.album-releaseDate').html('<input class="edit-album-releaseDate" value="' + releaseDate + '"></input>');
}

// after editing an album, when the save changes button is clicked
function handleSaveChangesClick(e) {
  var albumId = $(this).parents('.album').data('album-id'); // $(this).closest would have worked fine too
  var $albumRow = $('[data-album-id=' + albumId + ']');

  var data = {
    name: $albumRow.find('.edit-album-name').val(),
    artistName: $albumRow.find('.edit-artist-name').val(),
    releaseDate: $albumRow.find('.edit-album-releaseDate').val()
  };
  console.log('PUTing data for album', albumId, 'with data', data);
  $.ajax({
    method: 'PUT',
    url: '/api/albums/' + albumId,
    data: data,
    success: handleAlbumUpdatedResponse
  });
  location.reload();
}

function handleAlbumUpdatedResponse(data) {
  console.log('response to update', data);

  var albumId = data._id;
  // scratch this album from the page
  $('[data-album-id=' + albumId + ']').remove();
  // and then re-draw it with the updates ;-)
  // renderAlbum(data);

  // BONUS: scroll the change into view ;-)
  // $('[data-album-id=' + albumId + ']')[0].scrollIntoView();
}

// this function takes a single album and renders it to the page
