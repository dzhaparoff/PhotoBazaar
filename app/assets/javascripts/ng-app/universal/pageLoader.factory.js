(function() { 'use strict';

	angular
	.module('phb')
	.factory('PageLoader', PageLoader);

	PageLoader.$inject = ['$http']

	function PageLoader($http) {
	return { 
		getPageFullContent: function(path){
			path = new Url(path); 
			path.query.mode = 'ajax_page_load';
			return $http.get(path.toString())
		}
	 }
	}

})();