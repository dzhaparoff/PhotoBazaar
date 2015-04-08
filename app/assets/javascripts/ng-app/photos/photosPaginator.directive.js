(function() { 'use strict';

	angular
	.module('phb')
	.directive('photosPaginator', photosPaginator);

	photosPaginator.$inject = ['$rootScope', 'ngProgress']

	function photosPaginator($rootScope, ngProgress) {
	return { 
		restrict : 'A',
		replace : true,
		//transclude : true,
		//template : '<div class="ui dimmer inverted"><div class="ui large text loader">Загрузка страницы {{pagenumber}}</div></div>',
		//template : '<div class="ui page dimmer"><div class="content"><div class="center">Загрузка страницы {{pagenumber}}</div></div></div>',
		template: '<div></div>',
		link : function($scope, $element, $attr) {

			$scope.pagenumber = $rootScope.page_number;

			
		}
		}
	}

})();