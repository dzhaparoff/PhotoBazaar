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
