(function() { 'use strict';

	angular
	.module('phb')
	.directive('phbKeydown', phbKeydown);


	function phbKeydown() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {

			var functionToCall = $scope.$eval($attr.phbKeydown),
				functionToCallListener = function(e){
					functionToCall(e.which, $attr)
				}

			window.addEventListener('keydown',functionToCallListener,false)

			$element.bind('$destroy', function(){
				window.removeEventListener('keydown',functionToCallListener,false)
			})

		}
	 }
	}

})();