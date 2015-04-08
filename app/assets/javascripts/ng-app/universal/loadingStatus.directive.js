(function() { 'use strict';

	angular
	.module('phb')
	.directive('loadingStatus', loadingStatus);

	loadingStatus.$inject = ['ngProgress']

	function loadingStatus(ngProgress) {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {
			
			var imgLoad = imagesLoaded($element),
				items_count = $element.find('img').length,
				cur_item = 0;

				ngProgress.reset();
				ngProgress.set(0);

				imgLoad.on( 'progress', function( instance, image ) {
					var progress = cur_item/items_count*100;
					    cur_item = cur_item + 1;
					
					ngProgress.set(progress);
					
				});

				imgLoad.on('always', function(instance) {
					ngProgress.complete();
					imgLoad.off('progress');
					imgLoad.off('always');
				})

			$scope.$on('loading_start',function(event){
				ngProgress.reset();
				ngProgress.set(0);
			})

			$scope.$on('loading_progress',function(event, progress){
				ngProgress.set(progress);
			})

			$scope.$on('loading_complete',function(event){
				ngProgress.complete();
			})


		}
		}
	}

})();