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