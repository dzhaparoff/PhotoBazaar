(function() { 'use strict';

	angular
	.module('phb')
	.directive('pageMetaData', pageMetaData);

	function pageMetaData($location) {
	return { 
		restrict : 'AEL',
		link : function($scope, $element, $attr) {

			if(typeof $scope.page === "undefined") $scope.page = {};
				
				$scope.page.title = $attr.pageTitle;
				$scope.page.content_class = $attr.contentClass;
				//$element.remove();

				ga('set', {
				  page: $location.url(),
				  title: $attr.pageTitle
				});

				ga('send', 'pageview');
			
		}
	}
	}

})();
