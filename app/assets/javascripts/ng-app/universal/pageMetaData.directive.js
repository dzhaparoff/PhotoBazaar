(function() { 'use strict';

	angular
	.module('phb')
	.directive('pageMetaData', pageMetaData);

	function pageMetaData() {
	return { 
		restrict : 'AEL',
		link : function($scope, $element, $attr) {
			$scope.page.title = $attr.pageTitle;
		}
	}
	}

})();