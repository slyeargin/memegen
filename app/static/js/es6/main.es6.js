(function(){
  'use strict';

  $(document).ready(init);

  function init(){
    $('#generate').click(getMemes);
  }

  function getMemes(){
    ajax('/memes', 'get', null);
  }
})();


function ajax(url, type, data={}, success=r=>console.log(r), dataType='json'){
  'use strict';
  $.ajax({url:url, type:type, dataType:dataType, data:data, success:success});
}
