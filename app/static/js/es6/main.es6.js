/* jshint unused:false */

(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#memes').hide();
    $('#generate').hide();
    $('#getMemes').click(getMemes);
    $('#memes').change(showPic);
    $('#generate').click(generate);
  }

  function generate(){
    var top = $('#top').val();
    var bottom = $('#bottom').val();
    var name = $('#name').val();
    var tag = $('#memes option:selected').text();
    var file = $('#memes option:selected').data('url').slice(0, -1);
    ajax('/memes', 'post', {top:top, bottom:bottom, name:name, tag:tag, file:file}, obj=>{
      console.log(obj);
    });
  }

  function showPic(){
    $('#generate').show();
    var title = $('#memes option:selected').text();
    var url = $('#memes option:selected').data('url').slice(0, -1);
    var width = $('#memes option:selected').data('width');
    var height = $('#memes option:selected').data('height').slice(0, -1);
    $('#showMeme').html(`<input id='name' placeholder='Name Your Meme' style='width:${width - 6}px' /><div id='pic' style='background-image:url(${url}); width:${width}px; height:${height}px'><input id='top' placeholder='Type top caption here' /><input id='bottom' placeholder='Type bottom caption here' /></div>);
  }

  function getMemes(){
    ajax('/memes', 'get', null, obj=>{
      var meme = obj.data.memes;
      meme.forEach(m=>{
        $('#memes').append(`<option data-url=${m.url}, data-height=${m.height}, data-width=${m.width} class='meme'>${m.name}</option>`);
      });
      $('#memes').show();
    });
  }
})();


function ajax(url, type, data={}, success=r=>console.log(r), dataType='json'){
  'use strict';
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}
