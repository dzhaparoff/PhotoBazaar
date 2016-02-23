(function() { 'use strict';

	angular
	.module('phb')
	.directive('sidebarToggle', sidebarToggle);


	function sidebarToggle() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {
			
			var sidebar_toggle;

			function sidebar_toggle(){
    			$('.main_sidebar').sidebar('toggle');
    		}

    		$element.click(sidebar_toggle)

		}
		}
	}

})();
