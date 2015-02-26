(function() { 'use strict';

	angular
	.module('phb')
	.directive('phbContent', phbContent);

	function phbContent($location, $cacheFactory, $compile, $timeout, PageLoader) {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {

			var location = $location.url(),
				content = $element,
				disableLocationListener = false,
				loader = '<div class="ui large loader page_loader"></div>',
				getPageFullContent

			$scope.$on('disableLocationListener',function(e,v){
				disableLocationListener = v;
			})

			$scope.$on('$locationChangeSuccess',function(e,n,o) {


				// var old_path = new Url(o);
				// var new_path = new Url(n);

				// if(new_path.path.match(/\/photo\//) ) content.addClass('photo_detail');
				// 								else  content.removeClass('photo_detail');

				if( n !== o && !_.isEmpty(n) 
					&& 
					!disableLocationListener 
					) {

					content.empty();

					$('body').append(loader).find('.loader.page_loader').fadeIn(333);

					if( typeof $cacheFactory[n] === 'undefined')

						PageLoader.getPageFullContent(n)
								  .then(function(d){
								  			if(d.status == 200){
												getPageFullContent(d.data)
												$cacheFactory[n] = d.data;
								  			}
								          });
					else

						getPageCachedContent($cacheFactory[n]);

					}

					
			});

			function getPageCachedContent(d) {
				var template = $(d),
					compiled = $compile(template);
				
				content.html(template);

				$timeout(function(){
					compiled($scope);
					compiled = null;

					$('body').find('.loader.page_loader').fadeOut(333,function(){
							$(this).remove();
						});

				});

			}

			function getPageFullContent(d) {

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