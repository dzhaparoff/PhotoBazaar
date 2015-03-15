(function() { 'use strict';

	angular
	.module('phb')
	.directive('mapLinkTag', mapLinkTag);


	function mapLinkTag($compile) {
	
		return { 
			restrict : 'AC',
			scope : {
				longitude : "@",
				latitude : "@",
				photo : "="
			},
			link : function($scope, $element, $attr) {

				if(typeof google == 'undefined') { 
					
					var googleMapScript = document.createElement('script');
						googleMapScript.type = 'text/javascript';
						googleMapScript.src = 'http://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&sensor=SET_TO_TRUE_OR_FALSE';

					//document.getElementsByTagName('head')[0].appendChild(googleMapScript);

				}

			}
		}

}

})();
