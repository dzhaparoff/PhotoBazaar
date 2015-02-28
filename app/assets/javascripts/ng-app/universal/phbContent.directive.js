(function() { 'use strict';

	angular
	.module('phb')
	.directive('phbContent', phbContent);

	function phbContent($location, $cacheFactory, $compile, $timeout, PageLoader) {
	return { 
		restrict : 'A',
		controller : function($element){
			if( typeof $cacheFactory[$location.absUrl()] === 'undefined' ){
				$cacheFactory[$location.absUrl()] = $element.html();
			}
		},
		link : function($scope, $element, $attr) {

			var location = $location.url(),
				content = $element,
				disableLocationListener = false,
				loader = '<div class="ui large loader page_loader"></div>',
				setPageFullContent,
				setPageCachedContent;

			$scope.$on('disableLocationListener',function(e,v){
				disableLocationListener = v;
			})

			$scope.$on('$locationChangeSuccess',function(e,n,o) {

				if( n !== o && !_.isEmpty(n) 
					&& 
					!disableLocationListener 
					) {

					$cacheFactory['scrollPositions_' + o] = window.scrollY;
					
					content.empty();

					if( typeof $cacheFactory[n] === 'undefined'){
											
							$('body').append(loader).find('.loader.page_loader').fadeIn(333);
							PageLoader.getPageFullContent(n)
									  .then(function(d){
									  			if(d.status == 200){
									  				$cacheFactory[n] = d.data;
													setPageFullContent(d.data)
									  			}
									          });
						}
					else
						setPageCachedContent($cacheFactory[n], n);

					}

					
			});

			function setPageCachedContent(d,n) {

				var template = $(d),
					compiled = $compile(template);
				
				content.html(template);

				$scope.$applyAsync(function(){
					
					compiled($scope);
					compiled = null;

					window.scrollTo( 0, $cacheFactory['scrollPositions_' + n] );

				});

			}

			function setPageFullContent(d) {

				var data = document.createElement('div'),
				    template = $(d),
				    compiled = $compile(template);

				$(data).html(d);

				var imgLoad = imagesLoaded($(data)),
				    items_count = $(data).find('img').length,
				    cur_item = 0;


					content.html(template);

					$timeout(function(){
						compiled($scope);
						compiled = null;
					});


				imgLoad.on( 'progress', function( instance, image ) {
						
					var progress = cur_item/items_count*100;
		    			cur_item = cur_item + 1;
					
					$scope.$emit('loading_progress', progress);

				});

				imgLoad.on( 'always', function( instance ) {
					
					imgLoad.off('progress');
					imgLoad.off('always');

					$('body').find('.loader.page_loader').fadeOut(333,function(){
							$(this).remove();
							$scope.$emit('loading_complete');
					});
					
					imgLoad = null;
					template = null;
					data = null;

				})
			
			}

		}
	 }
	}

})();