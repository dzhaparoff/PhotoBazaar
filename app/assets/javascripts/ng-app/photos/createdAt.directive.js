(function() { 'use strict';

	angular
	.module('phb')
	.directive('createdAt', createdAt);


	function createdAt($timeout, $filter) {
	
			return function(scope, element, attrs) {

				var time = attrs.createdAt,
					intervalLength = 30000,
					filter = $filter('date_from_now'),
					timeoutId;

				function updateTime(){
					element.text(filter(time));
				}

				function updateLater(){
					timeoutId = 
					$timeout(function() {
						updateTime();
						updateLater();
					}, 
					intervalLength);
				}

				element.bind('$destroy', function(){
					$timeout.cancel(timeoutId);
				})

				updateTime(); updateLater();

			}

}

})();