(function() { 'use strict';

	angular
	.module('phb')
	.directive('infinitePaginationPhotosList', infinitePaginationPhotosList);
	
	function infinitePaginationPhotosList($location, $http, $compile, $timeout, $cacheFactory, ngProgress){
	
	return {

		restrict : 'A',

		scope : {
			total : "@",
			perPage : "@",
			id : "@",
			lastPhotoOfTheDay : "@"
		},

		link : function($scope, $element, $attr) {

			var $li = $element.children('li'),
				old_page_number = 0,
				page_number = 1,
				last_photo_of_the_day = $scope.lastPhotoOfTheDay,
				height = screen.height,
				scrollListner,
				changePageOnScroll,
				show_page,
				init_AnimOnScroll,
				checkAnimationLock,
				getDummyHeigh,
				anim_on_scroll,
				reinit_chache_for_infinite_pagination,
				dontWaitImages = false;


			function scrollListner($scope) {
	 	
			 	var scrollDelta = (document.body.scrollHeight - $(window).scrollTop()) - document.body.clientHeight;
			 	if (scrollDelta < 300) show_page('next');
		 		
		 		//if ( $(window).scrollTop() == 0 ) show_page('prev');

			}

			function changePageOnScroll() {
				
				var winTop = $(window).scrollTop();

				var top = $.grep($li, function(item) {
					return $(item).position().top <= winTop;
				});
				
				if(top.length > 0) {
					var element = _.last(top);
					var page = $(element).attr('data-page');
					$scope.page_number = page;
					if(old_page_number != page) $scope.$applyAsync();
					old_page_number = page;
				};

			}

			function show_page(mode){

				var path = new Url($location.absUrl()); var pages = [];

				$($li).each(function(i){
					 pages.push($(this).attr('data-page'));
				});

				var first_page_number = _.min(pages)
				var last_page_number = _.max(pages)

			    var pages_count = parseInt($scope.total/$scope.perPage) + 1;
			   
			    var navigate_Photos = false;
			    
			    path.query.mode = 'partial';

				if( mode == 'next' && last_page_number < pages_count) {
					page_number = parseInt(last_page_number) + 1;
					navigate_Photos = 'append';
				}

				else

				if( mode == 'prev' && first_page_number > 1) {
					page_number = parseInt(first_page_number) - 1;
					navigate_Photos = 'prepend';
				} 

				path.query.page = page_number;

				if(navigate_Photos) {

					$scope.$emit('loading_start');

					$http.get(path.toString()).success( function(data) {

						var another_photo_of_day = angular.element(data).filter('.photo_of_the_day');
							data = angular.element(data).filter('li');

							if(another_photo_of_day.attr('data-number') == last_photo_of_the_day) another_photo_of_day = null;
								else last_photo_of_the_day = another_photo_of_day.attr('data-number');

							var template = $(data);

							reinit_chache_for_infinite_pagination(data);
							
							var imgLoad = imagesLoaded(template),
								items_count = template.find('img').length,
								cur_item = 0;

							imgLoad.on( 'progress', function( instance, image ) {
						
								var progress = cur_item/items_count*100;
					    			cur_item = cur_item + 1;
								
								$scope.$emit('loading_progress', progress);

							});

							imgLoad.on( 'always', function( instance ) {

								var prepend_dummies = '';

								if(navigate_Photos == 'append')   {
									if(another_photo_of_day != null){
										var dummy_height = getDummyHeigh(last_photo_of_the_day, height);
										prepend_dummies = angular.element('<li class="dummy full" id="lbph_index_' + last_photo_of_the_day + '"></li>');
										$element.append( prepend_dummies ).append( template );
										$('#lbph_index_'+last_photo_of_the_day).css({height: dummy_height});
										anim_on_scroll._reinit(prepend_dummies.add(template), 0, checkAnimationLock());
									}
									else {
										$element.append( template );
										anim_on_scroll._reinit(template, 0, checkAnimationLock());
									}
								}

								if(navigate_Photos == 'prepend')  $element.prepend( template );

								$li = $element.children('li');

								if(navigate_Photos == 'append') {
									var another_photo_of_day_template = $(another_photo_of_day);
										$compile(another_photo_of_day_template)($scope);
									$('.pusher').append(another_photo_of_day_template)
								}
								
							 	///init_AnimOnScroll($scope.id, 0);

							 	$compile(template)($scope);

							 	$(document).on("scroll", function(){
									 scrollListner();
									 //changePageOnScroll();
								});

							 	imgLoad.off('progress');
							 	imgLoad.off('always');

							 	$scope.$emit('loading_complete');

							});
						
					})

					$(document).off('scroll');

				}

			}

			$(document).on("scroll", function(){
				 scrollListner();
			});

			function checkAnimationLock(){
				
				var posY = window.scrollY;
				
				if( typeof $cacheFactory['scrollPositions_' + $location.absUrl()] !== "undefined" ) {

					if( posY > $cacheFactory['scrollPositions_' + $location.absUrl()] ) {
						$cacheFactory['scrollPositions_' + $location.absUrl()] = undefined;
						return false;
					}

					return true;
					
				}

				else return false;

			}

			
			function reinit_chache_for_infinite_pagination(new_elements){

				if( typeof $cacheFactory[$location.absUrl()] !== "undefined" ) {
					var $cached = $($cacheFactory[$location.absUrl()]);
					$cached.find('#Photos').append(new_elements);
					$cacheFactory[$location.absUrl()] = $("<div></div>").append($cached).html();
				}

			}


			function init_AnimOnScroll(element, viewportFactor) {

				if( $cacheFactory["scrollPositions_" + $location.absUrl()] > 0 ) dontWaitImages = true;
				else dontWaitImages = false;

				anim_on_scroll = new AnimOnScroll( document.getElementById( element ), {
						minDuration    : 0.4,
						maxDuration    : 0.7,
						viewportFactor : viewportFactor,
						dontWaitImages : dontWaitImages,
						dontAnimate    : checkAnimationLock()
				});
			}

			function getDummyHeigh(number, height) {
				
				var pos_array = [],
					last_elements,
					delta,
					el_number;

				el_number = parseInt(number)+1;

				while( $('[data-bp-number="' + el_number + '"]').length == 0 ) {
					++el_number
				}

				$('[data-bp-number="' + el_number + '"]').each(function(index){
						pos_array[index] = $(this).offset().top + $(this).height();
				});
				
				last_elements = _.takeRight(_.sortBy(pos_array),3);
				delta = _.max(last_elements) - _.min(last_elements);
				return height*.6 - delta;

			}

			init_AnimOnScroll($scope.id, 0.2);

			$scope.$watch('page_number',function(n,o){
				if(n != o && n > 0) { 
					$location.search('page', n);
					$scope.$emit('disableLocationListener',true);
					$timeout(function(){
						$scope.$emit('disableLocationListener',false);
					})
				}
			})


			$element.bind('$destroy', function(){
					$(document).off("scroll");
					$li = null;
					anim_on_scroll._destroy();
					anim_on_scroll = null;
					$scope.$destroy();
			})

		}
	}
}

})();
