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





});





// this function takes a single album and renders it to the page
