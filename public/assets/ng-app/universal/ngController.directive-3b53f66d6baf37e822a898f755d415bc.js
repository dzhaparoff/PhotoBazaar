(function() { 'use strict';

	angular
	.module('phb')
	.directive('ngController', ngController);

	function ngController() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {

	    		$element.bind('$destroy', function(){
							$scope.$destroy();
				})

			}
		}
	}

})();
