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
