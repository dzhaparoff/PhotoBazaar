(function() { 'use strict';
	angular
	.module('phb', ['ngProgress']);
})();
(function() { 'use strict';

	angular
	.module('phb')
	.config(['$locationProvider', locationProvider])

  locationProvider.$inject = ['$locationProvider']

	function locationProvider($locationProvider) {
	  $locationProvider.html5Mode(true)
	}


})();
(function() { 'use strict';

	angular
	.module('phb')
	.factory('helpers', helpers);

	function helpers() {
    return {
      colorBrightness :  function(color) {
       	var	rgb = color.split(',');
       	var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
   			return (o > 125) ? true : false //http://www.w3.org/TR/AERT#color-contrast
      }
    }

}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.filter('date_from_now', date_from_now);

	function date_from_now() {
    return function(input) {
      var day = new moment.utc(input, 'YYYY-MM-DD hh:mm:ss UTC');
      return day.fromNow();
    };

}

})();
(function() { 'use strict';
	var svgIconConfig = {
		hamburger : {
			url : '/images/svg/hamburger.svg',
			animation : [
			{ 
				el : 'path:nth-child(1)', 
				animProperties : { 
					from : { val : '{"path" : "m 5.0916789,20.818994 53.8166421,0"}' }, 
					to : { val : '{"path" : "m 5.091679,9.771104 53.816642,0"}' }
				}
			},
			{ 
				el : 'path:nth-child(3)', 
				animProperties : { 
					from : { val : '{"path" : "m 5.0916788,42.95698 53.8166422,0"}' }, 
					to : { val : '{"path" : "m 5.0916789,54.00487 53.8166421,0"}' }
				} 
			}
			]
		},
		netlab : {
			url : '/images/svg/netlab.svg',
			animation : [
			{
				el : '.cls-3',
				animProperties:{
					from : { val: '{"path" : "M49.000,172.000 C21.938,172.000 -0.000,150.210 -0.000,123.331 C-0.000,105.982 9.139,90.753 22.897,82.135 C25.669,80.398 33.830,72.395 33.727,58.228 C33.701,54.603 34.366,51.382 33.091,48.115 C31.820,44.859 27.089,44.635 26.727,39.898 C26.193,32.895 30.529,31.891 33.091,31.681 C33.256,31.667 47.019,31.681 49.637,31.681 C52.300,31.681 65.396,31.678 65.546,31.681 C69.092,31.758 72.638,32.250 71.909,39.266 C71.429,43.885 67.089,44.944 65.616,48.095 C64.408,50.676 64.979,54.793 64.909,58.228 C64.641,71.393 72.417,80.455 75.073,82.116 C88.848,90.731 98.000,105.969 98.000,123.331 C98.000,150.210 76.062,172.000 49.000,172.000 ZM44.684,42.376 C43.313,42.376 42.201,43.492 42.201,44.869 C42.201,46.246 43.313,47.362 44.684,47.362 C46.055,47.362 47.166,46.246 47.166,44.869 C47.166,43.492 46.055,42.376 44.684,42.376 ZM43.108,70.166 C39.511,70.166 36.595,73.085 36.595,76.686 C36.595,80.286 39.511,83.205 43.108,83.205 C46.704,83.205 49.620,80.286 49.620,76.686 C49.620,73.085 46.704,70.166 43.108,70.166 ZM53.372,54.841 C51.316,54.841 49.648,56.515 49.648,58.580 C49.648,60.645 51.316,62.319 53.372,62.319 C55.429,62.319 57.096,60.645 57.096,58.580 C57.096,56.515 55.429,54.841 53.372,54.841 ZM81.935,98.042 C78.984,97.952 77.178,97.514 75.000,98.000 C57.129,101.989 50.318,94.185 45.278,91.278 C37.505,86.793 28.744,85.746 23.570,89.415 C13.269,96.717 6.823,107.349 6.823,123.256 C6.823,146.747 25.845,165.790 49.310,165.790 C72.775,165.790 92.679,146.730 91.798,123.256 C91.262,108.986 87.631,100.620 81.935,98.042 Z"}' },
					to   : { val: '{"path" : "M49.000,172.000 C21.938,172.000 -0.000,150.210 -0.000,123.331 C-0.000,105.982 9.139,90.753 22.897,82.135 C25.669,80.398 33.830,72.395 33.727,58.228 C33.701,54.603 34.366,51.382 33.091,48.115 C31.820,44.859 27.089,44.635 26.727,39.898 C26.193,32.895 30.529,31.891 33.091,31.681 C33.256,31.667 47.019,31.681 49.637,31.681 C52.300,31.681 65.396,31.678 65.546,31.681 C69.092,31.758 72.638,32.250 71.909,39.266 C71.429,43.885 67.089,44.944 65.616,48.095 C64.408,50.676 64.979,54.793 64.909,58.228 C64.641,71.393 72.417,80.455 75.073,82.116 C88.848,90.731 98.000,105.969 98.000,123.331 C98.000,150.210 76.062,172.000 49.000,172.000 ZM38.672,37.375 C37.300,37.375 36.188,38.494 36.188,39.875 C36.188,41.256 37.300,42.375 38.672,42.375 C40.044,42.375 41.156,41.256 41.156,39.875 C41.156,38.494 40.044,37.375 38.672,37.375 ZM47.109,62.156 C43.511,62.156 40.594,65.080 40.594,68.688 C40.594,72.295 43.511,75.219 47.109,75.219 C50.708,75.219 53.625,72.295 53.625,68.688 C53.625,65.080 50.708,62.156 47.109,62.156 ZM54.375,42.844 C52.321,42.844 50.656,44.516 50.656,46.578 C50.656,48.641 52.321,50.313 54.375,50.313 C56.429,50.313 58.094,48.641 58.094,46.578 C58.094,44.516 56.429,42.844 54.375,42.844 ZM81.935,98.042 C78.984,97.952 77.178,97.514 75.000,98.000 C57.129,101.989 50.318,94.185 45.278,91.278 C37.505,86.793 28.744,85.746 23.570,89.415 C13.269,96.717 6.823,107.349 6.823,123.256 C6.823,146.747 25.845,165.790 49.310,165.790 C72.775,165.790 92.679,146.730 91.798,123.256 C91.262,108.986 87.631,100.620 81.935,98.042 Z"}' }
				}
			},
			{
				el : '.cls-4',
				animProperties:{
					from : { val: '{"transform" : "t0 10" , "opacity" : 0 }', delayFactor : .33  },
					to   : { val: '{"opacity" : 1, "transform" : "t0 -5" }', before : '{"transform" : "t0 10" ,"opacity" : 0}',  delayFactor : .33 }
				}
			},
			{
				el : '.cls-5',
				animProperties:{
					from : { val: '{"transform" : "t0 15" , "opacity" : 0 }', delayFactor : .66  },
					to   : { val: '{"opacity" : 1, "transform" : "t0 -2" }', before : '{"transform" : "t0 15" , "opacity" : 0}', delayFactor : .66 }

				}
			},
			{
				el : '.cls-6',
				animProperties:{
					from : { val: '{"transform" : "t0 10" , "opacity" : 0 }', delayFactor : .99 },
					to   : { val: '{"opacity" : 1, "transform" : "t0 0" }', before : '{"transform" : "t0 15" , "opacity" : 0}', delayFactor : .99 }

				}
			}
			]
		},
		next : {
			url : '/images/svg/next.svg',
			animation : [
			{
				el : '.cls-2',
				animProperties:{
					from : { val: '{"transform" : "t0 0" , "path" : "M4,44l-4-3l17-19L0,3l4-3l20,22L4,44z"}' },
					to   : { val: '{"transform" : "t0 10" , "path" : "M41.2,27L38,25.364L46.945,15H0v-3h46.945L38,1.636L41.2,0L53,13.5L41.2,27z"}' }
				}
			}
			]
		},
		prev : {
			url : '/images/svg/prev.svg',
			animation : [
			{
				el : '.cls-2',
				animProperties:{
					from : { val: '{"transform" : "t0 0" , "path" : "M0,22L20,0l4,3L7,22l17,19l-4,3L0,22z"}' },
					to   : { val: '{"transform" : "t0 10" , "path" : "M0,13.5L11.8,0L15,1.636L6.055,12H53v3H6.055L15,25.364L11.8,27L0,13.5z"}' }
				}
			}
			]
		},
		left_key : {
			url : '/images/svg/left_key.svg',
			animation : [
			]
		},
		m_key : {
			url : '/images/svg/m_key.svg',
			animation : [
			]
		},
		right_key : {
			url : '/images/svg/right_key.svg',
			animation : [
			]
		},
		vk : {
			url : '/images/svg/vk.svg',
			animation : [
				{
				el : '.rectangle',
				animProperties:{
					from : { val: '{"path" : "M21.892,0h-19.6c-1.2,0-2.2,1-2.2,2.2v19.6c0,1.2,1,2.2,2.2,2.2h19.6c1.2,0,2.2-1,2.2-2.2V2.2 C24.092,1,23.092,0,21.892,0z M12.555,19.396H6.426V4.604h6.696c1.94,0,3.729,1.235,3.729,3.412c0,1.682-0.939,2.833-2.136,3.191 v0.043c1.776,0.367,3.044,1.331,3.044,3.658C17.759,17.062,16.293,19.396,12.555,19.396z"}' },
					to   : { val: '{"path" : "M57.8,0H2.292c-1.2,0-2.2,1-2.2,2.2v19.6c0,1.2,1,2.2,2.2,2.2H57.8c1.2,0,2.2-1,2.2-2.2V2.2 C60,1,59,0,57.8,0z M12.555,19.396H6.426V4.604h6.696c1.94,0,3.729,1.235,3.729,3.412c0,1.682-0.939,2.833-2.136,3.191v0.043 c1.776,0.367,3.044,1.331,3.044,3.658C17.759,17.062,16.293,19.396,12.555,19.396z"}' }
				}
				}
			]
		},
		fb : {
			url : '/images/svg/fb.svg',
			animation : [
				{
				el : '.rectangle',
				animProperties:{
					from : { val: '{"path" : "M16,19v-5h3.5l0.5-3h-4V8.7C16,7.8,16.8,7,17.7,7H19V4h-3c-3,0-4,1.5-4,4v3H9v3h3v10H2.2C1,24,0,23,0,21.8 V2.2C0,1,1,0,2.2,0h19.6C23,0,24,1,24,2.2v19.6c0,1.2-1,2.2-2.2,2.2H16V19"}' },
					to   : { val: '{"path" : "M16,19v-5h3.5l0.5-3h-4V8.7C16,7.8,16.8,7,17.7,7H19V4h-3c-3,0-4,1.5-4,4v3H9v3h3v10H2.2C1,24,0,23,0,21.8 V2.2C0,1,1,0,2.2,0h55.6C59,0,60,1,60,2.2v19.6c0,1.2-1,2.2-2.2,2.2H16V19"}' }
				}
				}
			]
		},
		tw : {
			url : '/images/svg/tw.svg',
			animation : [
				{
				el : '.rectangle',
				animProperties:{
					from : { val: '{"path" : "M21.6,0H2.4C1.08,0,0,1.08,0,2.4v19.2C0,22.92,1.08,24,2.4,24h19.2c1.32,0,2.4-1.08,2.4-2.4V2.4 C24,1.08,22.92,0,21.6,0z M18.797,8.717c-0.12,5.52-3.6,9.36-8.88,9.6c-2.16,0.12-3.72-0.6-5.16-1.44 c1.56,0.24,3.6-0.36,4.68-1.32c-1.56-0.12-2.52-0.96-3-2.28c0.48,0.12,0.96,0,1.32,0c-1.44-0.48-2.4-1.32-2.52-3.24 c0.36,0.24,0.84,0.36,1.32,0.36c-1.08-0.6-1.8-2.88-0.96-4.32c1.56,1.68,3.48,3.12,6.6,3.36c-0.84-3.36,3.72-5.16,5.52-2.88 c0.84-0.12,1.44-0.48,2.04-0.72c-0.24,0.84-0.72,1.32-1.32,1.8c0.6-0.12,1.2-0.24,1.68-0.48 C19.997,7.757,19.397,8.237,18.797,8.717z"}' },
					to   : { val: '{"path" : "M57.6,0H2.4C1.08,0,0,1.08,0,2.4v19.2C0,22.92,1.08,24,2.4,24h55.2c1.32,0,2.4-1.08,2.4-2.4V2.4 C60,1.08,58.92,0,57.6,0z M18.797,8.717c-0.12,5.52-3.6,9.36-8.88,9.6c-2.16,0.12-3.72-0.6-5.16-1.44 c1.56,0.24,3.6-0.36,4.68-1.32c-1.56-0.12-2.52-0.96-3-2.28c0.48,0.12,0.96,0,1.32,0c-1.44-0.48-2.4-1.32-2.52-3.24 c0.36,0.24,0.84,0.36,1.32,0.36c-1.08-0.6-1.8-2.88-0.96-4.32c1.56,1.68,3.48,3.12,6.6,3.36c-0.84-3.36,3.72-5.16,5.52-2.88 c0.84-0.12,1.44-0.48,2.04-0.72c-0.24,0.84-0.72,1.32-1.32,1.8c0.6-0.12,1.2-0.24,1.68-0.48 C19.997,7.757,19.397,8.237,18.797,8.717z"}' }
				}
				}
			]
		}

	}

	angular
	.module('phb')
	.constant('svgIconConfigConstant', svgIconConfig)
	.directive('svgIcon', svgIconElement)

	svgIconElement.$inject = ['svgIconConfigConstant']

	function svgIconElement(svgIconConfigConstant){
		return {
			link : function(scope, element, attr){
				
				var viewbox = (typeof attr.viewbox === 'undefined') ? '0 0 64 64' : attr.viewbox,
				    speed   = (typeof attr.speed === 'undefined') ? 500 : parseInt(attr.speed),
				    easing  = (typeof attr.easing === 'undefined') ? 'elastic' : attr.easing

				new svgIcon( element.get(0), svgIconConfigConstant, { easing : mina[easing], speed: speed, size: {w: attr.width, h: attr.height}, viewbox : viewbox, evtoggle : 'mouseover' } );
			}
		}
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('anotherPhotoOfTheDay', anotherPhotoOfTheDay);

	function anotherPhotoOfTheDay() {
		return {
			restrict : 'A',
			scope : {
				number : "@",
				photoUrl : "@",
				hoverColor : "@"
			},
			link : function($scope, $element, $attr) {
				var position,
					number,
					height,
					scrolling,
					pos_array = [],
					this_e 	  = $element,
					requestID;

				$element.append("<div class='background' style='background-image:url(" + $scope.photoUrl +")'></div>");
				$element.append("<div class='cloak_bg' style='background-color: rgba("+ $scope.hoverColor +")'></div>");

				var background_element  = $element.find('.background');

				set_new_layer_on_page();

				$element.velocity({opacity:1},{duration:350, delay:500});

				    document.addEventListener("scroll", setScroll, false);
				    document.addEventListener("mousewheel", setScroll, false);

				    function setScroll() {
						scrolling = true;
					}

					function animate_on_scroll(){

						var requestAnimationFrame = window.requestAnimationFrame ||
		    										window.mozRequestAnimationFrame ||
		    										window.webkitRequestAnimationFrame ||
		    										window.msRequestAnimationFrame;

    					if(scrolling) {

						var scroll_parralax_position = window.scrollY + (height - height*.8)/2 - position;

							this_e.css({
								transform: 'translate3d(0px,' + scroll_parralax_position/4 + 'px,0px)'
							});

							background_element.css({
								transform: 'translate3d(0px,' + scroll_parralax_position/3 + 'px,0px)', 
							});

						}

						requestID = requestAnimationFrame(animate_on_scroll)

					}

					function set_new_layer_on_page(){

						number = parseInt($scope.number) + 1;

					    height = $(window).height();

					    while( $('[data-bp-number="' + number + '"]').length == 0 ) {
							++number
						}

					    $('[data-bp-number="' + number + '"]').each(function(index){
							pos_array[index] = $(this).offset().top + $(this).height()/2;
						});

						var last_elements = _.takeRight(_.sortBy(pos_array),3);
						position = last_elements.reduce(function(a,b){ return a + b;})/3;

						var scroll_parralax_position = window.scrollY + (height - height*.8)/2 - position;

						this_e.css({
							top: position, height: height*.8, 
							transform: 'translate3d(0px,' + scroll_parralax_position/4 + 'px,0px)'
						});

						background_element.css({
								transform: 'translate3d(0px,' + scroll_parralax_position/3 + 'px,0px)', 
						});

					}

					animate_on_scroll();

					$element.bind('$destroy', function(){
						document.removeEventListener("scroll", setScroll, false);
						document.removeEventListener("mousewheel", setScroll, false);

						window.cancelAnimationFrame(requestID)
						requestID = undefined;
					})

			}
		}
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('createdAt', createdAt);

	createdAt.$inject = ['$timeout', '$filter']

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
(function() { 'use strict';

	angular
	.module('phb')
	.directive('infinitePaginationPhotosList', infinitePaginationPhotosList);

	infinitePaginationPhotosList.$inject = ['$location', '$http', '$compile', '$timeout', '$cacheFactory', 'ngProgress']

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
(function() { 'use strict';

	angular
	.module('phb')
	.directive('mapLinkTag', mapLinkTag);

  mapLinkTag.$inject = ['$compile']

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
(function() { 'use strict';

	angular
	.module('phb')
	.controller('photoDetailController', photoDetailController);

	photoDetailController.$inject = ['$scope', '$location']

	function photoDetailController($scope, $location){

		var page_height = window.innerHeight,
			self = this;

		this.mainImage = {};
		this.mainImage.containerStyle = {};
		this.mainImage.imageStyle = {};

		function getNewImageSize(){

			page_height = window.innerHeight;
			self.mainImage.imageHeight = page_height - 200;
			self.mainImage.imageStyle = {
				'max-height' : self.mainImage.imageHeight
			}

		}

		function applyNewImageSize(){
			$scope.$applyAsync(getNewImageSize);
		}

		getNewImageSize();

		window.addEventListener( 'resize', applyNewImageSize, false );

		$scope.$on('$destroy',function(){
			window.removeEventListener( 'resize', applyNewImageSize, false );
		})

		this.showPrevPhoto = function(e, $attr){
			if (e == 37) 
				$scope.$apply(function(){
					$location.url($attr.href);
				});
		}

		this.showNextPhoto = function(e, $attr){
			if (e == 39) 
				$scope.$apply(function(){
					$location.url($attr.href);
				});
		}

		this.toggleFullRes = function(e, $attr){
			
			if (e == 77) 

				$scope.$apply(function(){
					
					var width = $attr.width,
						height = $attr.height

					if( $('.photo.column').height() >= height ) return false;

					if ( self.mainImage.containerStyle['height'] == height)
					{
					
						delete self.mainImage.containerStyle['height']
						delete self.mainImage.rowClass
					
					}
					else
					{
						self.mainImage.containerStyle['height'] = height
						self.mainImage.rowClass = ['maximized','mouse_pan_active']
						
						if( width <= $('.photo.column').width())
							self.mainImage.rowClass.push('small');

						if( width < height)
							self.mainImage.rowClass.push('vertical');
					}

				});
		}

	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('photoItemInList', photoItemInList);

	photoItemInList.$inject = ['helpers']

	function photoItemInList(helpers){
	
	return function($scope, $element, $attr){

		var $author = $($element).find('.author'),
			$link   = $($element).children('a'),
			$image = $($element).find('.image'),
			$top = $($element).find('.top'),
			$bottom = $($element).find('.bottom')

		// $scope.$applyAsync(function(){
		// 	$author.popup({
		// 	    popup : $($element).find('.popup'),
		// 	    on    : 'hover'
		// 	});
		// });

		var hash = $attr.baseColor,
			rgb  = parseInt(hash.substring(1,3),16) + ','+ parseInt(hash.substring(3,5),16) + ','+ parseInt(hash.substring(5,7),16);

		if( helpers.colorBrightness(rgb) ) $($element).find('.dimmer').addClass('blackcolor');

		$($element).find('.image_overflow').css({background: hash})

		$($element).find('.dimmer').css({background : "radial-gradient(rgba("+rgb+",0.433), rgba("+rgb+",0.92))"})
	    
		$link.dimmer({on: 'hover'});

		$image.velocity('stop').velocity({scale:1.05},0);
		
		$link.hover(
			function(){
				$top.velocity('stop').velocity({translateY:15},300,[.44,.2,.33,.63]);
				$bottom.velocity('stop').velocity({translateY:-15},300,[.44,.2,.33,.63]);
				$image.velocity('stop').velocity({scale:1},320,[.49,.15,.27,.83]);
			},
			function(){
				$top.velocity('stop').velocity({translateY:0},300,[.44,.2,.33,.63]);
				$bottom.velocity('stop').velocity({translateY:0},300,[.44,.2,.33,.63]);
				$image.velocity('stop').velocity({scale:1.05},320,[.49,.15,.27,.83]);
		})

		$element.bind('$destroy', function(){
			// $author.popup('destroy');
			$link.dimmer('destroy');
			$scope.$destroy();
		})

	}
	
}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('photoLink', photoLink);

	function photoLink($timeout, $compile, PageLoader){
	
	return function($scope, $element, $attr){

		var photo = {
				id   : $attr.photoId,
				link : $attr.href
			},
			compile_and_show,
			close_photo_detail,
			cache = null;

		$element.click(function(e){
				$scope.$emit('disableLocationListener',true);
				PageLoader.getPageFullContent(photo.link).success(compile_and_show);
		})

		function compile_and_show(d){
					var $template = $compile($(d))($scope);
					cache = document.getElementsByClassName('pusher').innerHtml;
					$('body .pusher').empty();
					$('body').append($template);
					window.onpopstate = function(e) {
						close_photo_detail();
					}

		}

		function close_photo_detail(){
			
			if(cache == null) return false;

			//var templete = $compile(cache)($scope);
			//cache = null;
			$('body .partial.photo_detail').remove();
			//$('body .pusher').html(templete);
			document.getElementsByClassName('pusher').innerHtml = cache;
		}

	}
	
}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.controller('photosController', photosController);

  photosController.$inject = ['$scope', '$location', '$http', '$compile']

	function photosController($scope, $location, $http, $compile){

	

	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('photosPaginator', photosPaginator);

	photosPaginator.$inject = ['$rootScope', 'ngProgress']

	function photosPaginator($rootScope, ngProgress) {
	return { 
		restrict : 'A',
		replace : true,
		//transclude : true,
		//template : '<div class="ui dimmer inverted"><div class="ui large text loader">Загрузка страницы {{pagenumber}}</div></div>',
		//template : '<div class="ui page dimmer"><div class="content"><div class="center">Загрузка страницы {{pagenumber}}</div></div></div>',
		template: '<div></div>',
		link : function($scope, $element, $attr) {

			$scope.pagenumber = $rootScope.page_number;

			
		}
		}
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('animatedFullframeBg', animatedFullframeBg);

	function animatedFullframeBg() {
	return {
		restrict : 'A',
		link : function($scope, $element, $attr) {

			var framerate_throttle = false,
				bg = $element.find('.bg_image'),
				animation_func = _.throttle(animate_on_scroll, 10),
				animation_mobile_func = _.throttle(animate_on_scroll_mobile, 10)


			window.addEventListener("mousemove", function(e){
					animation_func(e);
			},false);


			window.addEventListener('deviceorientation', function(eventData) {
					animate_on_scroll_mobile(eventData)
			}, false);

			function animate_on_scroll(e){

				var offsetXp = (1 - (document.body.clientWidth - e.clientX)/document.body.clientWidth);
				var offsetYp = (1 - (document.body.clientHeight - e.clientY)/document.body.clientHeight);

				var offsetX = -(offsetXp * 9 - 4.5).toFixed(2);
				var offsetY = -(offsetYp * 9 - 4.5).toFixed(2);

				bg.css({ transform : 'translate3d(' + offsetX + '%, ' + offsetY + '%, 0)'});

			}

			function animate_on_scroll_mobile(eventData){

			 	var yTilt = ( ( 1 - ( -eventData.beta + 90) / 180 ) * 9 - 4.5).toFixed(2);
				var xTilt = ( ( 1 - ( -eventData.gamma + 90) / 180 ) * 9 - 4.5).toFixed(2);

				bg.css( {transform : 'translate3d(' + xTilt + '%, ' + yTilt + '%, 0)'});

			}


		}
	  }
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('leftSidebar', leftSidebar);


	function leftSidebar() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {

			$('a.item').click(function(){
				$('a.item').removeClass('active');
				$(this).addClass('active');
			})

		}
	 }
	}

})();
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
(function() { 'use strict';

	angular
	.module('phb')
	.directive('mainHeader', mainHeader);


	function mainHeader() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {
			
			var header_bg = $element.find('.header_bg'),
				header_bg_wrap = $element.find('.header_bg_wrapper'),
				header_menu = $element.find('.page'),
				body = document.body,
    			scrolling,
    			requestID    		

    		$element.css({height: window.innerHeight*.8 });

			document.addEventListener("scroll",setScroll,false);
			document.addEventListener("mousewheel",setScroll,false);

    		function setScroll() {
				scrolling = true;
			}

    		function animate_on_scroll(){

    			var requestAnimationFrame = window.requestAnimationFrame ||
    										window.mozRequestAnimationFrame ||
    										window.webkitRequestAnimationFrame ||
    										window.msRequestAnimationFrame;

    			if(scrolling) {

    			var scroll_position = window.scrollY;

					header_bg.css({transform: 'translate3d(0px,' + scroll_position/2 + 'px,0px)'})
					header_bg_wrap.css({transform: 'translate3d(0px,' + scroll_position/4 + 'px,0px)'})

					if(scroll_position > 70) { 
							header_menu.addClass('static')
							.css({
								transform: 'translate3d(0,' + scroll_position + 'px,0)'
							})
						}
						else { 
							header_menu.removeClass('static')
							.css({
								transform: 'translate3d(0,0,0)'
							})
						}

						scrolling = false;
				}

						requestID = requestAnimationFrame(animate_on_scroll)
    		}

    		animate_on_scroll();

    		$element.bind('$destroy', function(){
						document.removeEventListener("scroll", setScroll, false);
						document.removeEventListener("mousewheel", setScroll, false);

						window.cancelAnimationFrame(requestID)
						requestID = null;
					})

		}
		}
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('mousePanBg', mousePanBg);


	function mousePanBg() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {

			var move, mouseX, mouseY, requestID,
				ph_width = $attr.width, ph_height = $attr.height,
				$photo_maximized = $element.children('.photo_maximized');

			$element[0].addEventListener("mousemove",setPan,false);

    		function setPan(e) {
				move = true;

				mouseX = e.clientX - $element[0].getBoundingClientRect().left;
				//mouseY = e.clientY - $element[0].getBoundingClientRect().top;

			}

    		function animate_on_mousemove(){

    			var requestAnimationFrame = window.requestAnimationFrame ||
    										window.mozRequestAnimationFrame ||
    										window.webkitRequestAnimationFrame ||
    										window.msRequestAnimationFrame;

    			if(move && $element.hasClass('mouse_pan_active')) {
    				
    				move = false;

    				var elem_width = $element.width()
    					// ,
    					// elem_height = $element.height()
						
					if(elem_width < ph_width) 

	    				{

							var	offsetXp = (1 - (elem_width - mouseX)/elem_width)
								// ,
								// offsetYp = (1 - (elem_height - mouseY)/elem_height);

								if(offsetXp > 1) offsetXp = 1;
								//if(offsetYp > 1) offsetYp = 1;
							
								$photo_maximized[0].style.backgroundPosition = offsetXp*100 + '% 50%';
	    				}
   
				}

				requestID = requestAnimationFrame(animate_on_mousemove)
    		}

    		animate_on_mousemove();

    		$element.bind('$destroy', function(){
						
				$element[0].removeEventListener("mousemove", setPan, false);

				window.cancelAnimationFrame(requestID)
				requestID = null;

			})

		}
		}
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('ngApp', ngApp);

	ngApp.$inject = ['$location', '$compile', '$timeout', 'PageLoader']

	function ngApp($location, $compile, $timeout, PageLoader) {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {
			
			if(typeof $scope.page === "undefined") {
				$scope.page = {};
				$scope.page.title = $element.find('title').html();
				$scope.page.content_class = null;
			}
			
		}
	}
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('ngController', ngController);

	function ngController() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {

	    		$element.bind('$destroy', function(){
							$scope.$destroy();
				})

			}
		}
	}

})();
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
(function() { 'use strict';

	angular
	.module('phb')
	.directive('pageMetaData', pageMetaData);

	pageMetaData.$inject = ['$location']

	function pageMetaData($location) {
	return { 
		restrict : 'AEL',
		link : function($scope, $element, $attr) {

			if(typeof $scope.page === "undefined") $scope.page = {};
				
				$scope.page.title = $attr.pageTitle;
				$scope.page.content_class = $attr.contentClass;
				//$element.remove();

				ga('set', {
				  page: $location.url(),
				  title: $attr.pageTitle
				});

				ga('send', 'pageview');
			
		}
	}
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('phbContent', phbContent);

	phbContent.$inject = ['$location', '$cacheFactory', '$compile', '$timeout', 'PageLoader']

	function phbContent($location, $cacheFactory, $compile, $timeout, PageLoader) {
	return {
		restrict : 'A',
		controller : ['$element', function($element){
					if( typeof $cacheFactory[$location.absUrl()] === 'undefined' ){
						$cacheFactory[$location.absUrl()] = $element.html();
					}
		}],
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
(function() { 'use strict';

	angular
	.module('phb')
	.directive('phbKeydown', phbKeydown);


	function phbKeydown() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {

			var functionToCall = $scope.$eval($attr.phbKeydown),
				functionToCallListener = function(e){
					functionToCall(e.which, $attr)
				}

			window.addEventListener('keydown',functionToCallListener,false)

			$element.bind('$destroy', function(){
				window.removeEventListener('keydown',functionToCallListener,false)
			})

		}
	 }
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.factory('vk',vk)
	.factory('fb',fb)
	.factory('tw',tw)
	.directive('sharebox', sharebox);

	vk.$inject = ['$http']
	fb.$inject = ['$http']
	tw.$inject = ['$http']

	function vk($http){
		return {
			getShareCount: function(page) {
				return $http({
					method: "JSONP",
					responseType : "text/javascript",
					url : 'http://vk.com/share.php?act=count&index=1&url='+page+'&callback=JSON_CALLBACK'
				})
			},
			share: function(page) {
				window.open('http://vk.com/share.php?url='+page,"","toolbar=0,status=0,width=626,height=436")
			}
		}
	}

	function fb($http){
		return {
			getShareCount: function(page) {
				return $http({
					method: "GET",
					url : 'http://graph.facebook.com/fql?q=SELECT share_count, like_count, comment_count, total_count, commentsbox_count, comments_fbid, click_count FROM link_stat WHERE url=%22'+page+'%22',
					headers: {
						"Access-Control-Allow-Origin" : "*"
					}
				})
			},
			share: function(page) {
				window.open('http://facebook.com/sharer.php?p[url]='+page,"","toolbar=0,status=0,width=626,height=436")
			}
		}
	}

	function tw($http){
		return {
			getShareCount: function(page) {
				return $http({
					method: "jsonp",
					url : 'http://urls.api.twitter.com/1/urls/count.json?url='+page+'&callback=JSON_CALLBACK'
				})
			},
			share: function(page, text) {
				window.open('http://twitter.com/share?url='+page+'&text='+text,"","toolbar=0,status=0,width=626,height=436")
			}
		}
	}

	sharebox.$inject = ['vk', 'fb', 'tw', '$timeout'];

	function sharebox(vk, fb, tw, $timeout) {
	return {
			restrict : 'A',
			scope : true,
			link : function($scope, $element, $attr) {
				var type = $attr.sharebox,
					link = $attr.link;
			 $scope.like = {count: 0};
			 if(type == 'vkontakte')
				{
					var t;
	 				if(!window.VK) window.VK = {};
				 	window.VK.Share = {
				 		count: function(idx, number){
				 			$scope.like.count = number
				 		}
				 	}
					vk.getShareCount(link);
					$element.click(function(){
						vk.share(link);
						$scope.like.count += 1
						t = $timeout(function(){
							vk.getShareCount(link);
							$timeout.cancel(t);
						},4000)
					})
				}

			 if(type == 'facebook')
				{
					var t,
						get_count;
					$element.click(function(){
						fb.share(link);
						$scope.like.count += 1
						t = $timeout(function(){
							get_count();
							$timeout.cancel(t);
						},4000)
					})

					get_count = function(){
						fb.getShareCount(link).success(function(d){
						$scope.like.count = d.data[0].share_count
						});
					}
					get_count();
				}

				if(type == 'twitter')
				{
					var t,
						get_count,
						text;
					text = $attr.text;
					$element.click(function(){
						tw.share(link,text);
						$scope.like.count += 1
						t = $timeout(function(){
							get_count();
							$timeout.cancel(t);
						},4000)
					})

					get_count = function(){
						tw.getShareCount(link).success(function(d){
							$scope.like.count = d.count
						});
					}
					get_count();
				}
			} //end LINK
		} //end RETURN
	} //end FUNC

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('sidebarToggle', sidebarToggle);


	function sidebarToggle() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {
			
			var sidebar_toggle;

			function sidebar_toggle(){
    			$('.main_sidebar').sidebar('toggle');
    		}

    		$element.click(sidebar_toggle)

		}
		}
	}

})();
(function() { 'use strict';

	angular
	.module('phb')
	.directive('smallSearchForm', smallSearchForm);


	function smallSearchForm() {
	return { 
		restrict : 'A',
		link : function($scope, $element, $attr) {
			
			var $$toggle_link  =  $element.find('.link'),
				$$input_box    =  $element.find('input[type="text"]')

			$$toggle_link.click(function(){
				$$input_box.toggleClass('visible');
			})

		}
	 }
	}

})();




