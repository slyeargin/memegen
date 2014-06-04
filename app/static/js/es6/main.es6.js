(function() {
    'use strict';

    $(document).ready(initialize);

    function initialize() {
        $('.register').click(register);
        $('.create').click(create);
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
