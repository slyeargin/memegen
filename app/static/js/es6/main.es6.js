(function() {
    'use strict';

    $(document).ready(initialize);

    function initialize() {
        $('.register').click(register);
        $('.create').click(create);
        $('#myCarousel').carousel({
          interval: 10000
        });
    }

    function register(e) {
        $('#registration').css('display', 'block');
        e.preventDefault();
    }

    function create(e) {
      $('#create').css('display', 'block');
      e.preventDefault();
    }


})();
