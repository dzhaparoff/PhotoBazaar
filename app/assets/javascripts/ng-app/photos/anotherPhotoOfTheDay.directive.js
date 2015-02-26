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