(function() { 'use strict';

	angular
	.module('phb')
	.factory('photo', photo);

	photo.$inject = ['$http']

	function photo($http) {
	
		return { 
			getPhoto : function(id){
				return $http.get('/api/photo?id='+id)
			}
		}

}

})();