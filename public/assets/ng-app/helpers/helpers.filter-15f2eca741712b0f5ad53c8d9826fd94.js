(function() { 'use strict';

	angular
	.module('phb')
	.filter('date_from_now', date_from_now);

	function date_from_now() {

    return function(input) {

       var day = new moment.utc(input, 'YYYY-MM-DD hh:mm:ss UTC');
       return day.fromNow();
       
    };

}

})();
