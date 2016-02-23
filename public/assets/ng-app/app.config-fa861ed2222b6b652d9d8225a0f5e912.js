(function() { 'use strict';

	angular
	.module('phb')
	.config(['$locationProvider', locationProvider])

  locationProvider.$inject = ['$locationProvider']

	function locationProvider($locationProvider) {
	  $locationProvider.html5Mode(true)
	}


})();
