(function() { 'use strict';

	angular
	.module('phb')
	.factory('helpers', helpers);

	function helpers() {

    return {

       	colorBrightness :  function(color) {
       	  var	rgb = color.split(',');
       		var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
   			return (o > 125) ? true : false //http://www.w3.org/TR/AERT#color-contrast
       	}

    }

}

})();
