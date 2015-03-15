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
