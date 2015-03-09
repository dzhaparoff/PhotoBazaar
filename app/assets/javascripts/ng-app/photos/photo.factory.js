(function() { 'use strict';

	angular
	.module('phb')
	.factory('photo', photo);

	function photo($http) {
	
		return { 
			getPhoto : function(id){
				return $http.get('/api/photo?id='+id)
			}
		}

}

})();