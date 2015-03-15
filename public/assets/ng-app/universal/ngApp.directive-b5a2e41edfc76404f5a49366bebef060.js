(function() { 'use strict';

	angular
	.module('phb')
	.directive('ngApp', ngApp);

	function ngApp($location, $compile, $timeout, PageLoader) {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {
			
			if(typeof $scope.page === "undefined") {
				$scope.page = {};
				$scope.page.title = $element.find('title').html();
				$scope.page.content_class = null;
			}
			
		}
	}
	}

})();
