(function() { 'use strict';

	angular
	.module('phb')
	.directive('likebox', likebox);

	function likebox() {
	return { 
			restrict : 'A',

			scope : true,

			link : function($scope, $element, $attr) {
				var type = $attr.likebox;
						   $scope.like = {};
				
				$scope.like.count = 99;
				
			}
		}
	}

})();