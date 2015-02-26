(function() { 'use strict';

	angular
	.module('phb')
	.directive('leftSidebar', leftSidebar);


	function leftSidebar() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {

			$('a.item').click(function(){
				$('a.item').removeClass('active');
				$(this).addClass('active');
			})

		}
	 }
	}

})();