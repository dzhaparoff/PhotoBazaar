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
