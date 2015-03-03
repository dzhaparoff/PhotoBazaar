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
						requestID = undefined;
					})

		}
		}
	}

})();