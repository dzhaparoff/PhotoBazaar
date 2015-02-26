var phb = angular.module('phb', ['ngCollection','ngResource']);

phb.config(['$resourceProvider', function($resourceProvider) {	  
  $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

phb.config(['$locationProvider',function($locationProvider){
	$locationProvider.html5Mode(true)
}])

/*factories*/	
phb.factory('helpers', function() {

    return {

       	colorBrightness :  function(color) {
       		rgb = color.split(',');
       		var o = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) /1000);
   			return (o > 125) ? true : false //http://www.w3.org/TR/AERT#color-contrast
       	}

    }

});

/*filters*/

phb.filter('date_from_now', function(){      
    return function(input) {
       var day = new moment.utc(input, 'YYYY-MM-DD hh:mm:ss UTC');
       return day.fromNow();
    };
});

/*directives*/	

phb.directive('photosPaginator', function($rootScope) {
	return { 
		restrict : 'A',
		replace : true,
		//transclude : true,
		//template : '<div class="ui dimmer inverted"><div class="ui large text loader">Загрузка страницы {{pagenumber}}</div></div>',
		//template : '<div class="ui page dimmer"><div class="content"><div class="center">Загрузка страницы {{pagenumber}}</div></div></div>',
		template: '<div class="ui vertical menu"><a class="active item">{{pagenumber}}</a></div>',
		link : function($scope, $element, $attr) {

			$scope.pagenumber = $rootScope.page_number;

			$scope.$on('next_page_pending',function(event, page_number){
				//$scope.pagenumber = page_number;
				//$($element).dimmer('show');
				$.fancybox.showLoading();
			})
			$scope.$on('next_page_loading_complete',function(event, page_number){
				$.fancybox.hideLoading();
				//$($element).dimmer('hide');
			})
		}
	}
})

phb.directive('infinitePaginationPhotosList', function($location, $http, $compile, $timeout){
	
	var $li; var old_page_number = 0; page_number = 1;

	return {

		restrict : 'A',

		scope : {
			total : "@",
			perPage : "@",
			id : "@"
		},

		link : function($scope, $element, $attr) {

			var $li = $element.children('li');

			scrollListner = function($scope) {
	 	
		 	var scrollDelta = (document.body.scrollHeight - $(window).scrollTop()) - document.body.clientHeight;
		 	
		 	if (scrollDelta < 300) 			  show_page('next');
		 	if ( $(window).scrollTop() == 0 ) show_page('prev');

			}

			changePageOnScroll = function() {
				
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

			show_page = function(mode){

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

					$scope.$emit('next_page_pending', page_number);

					$http.get(path.toString()).success( function(data) {

						var template = $(data);
						$compile(template)($scope);
					
							var imgLoad = imagesLoaded(template);

							imgLoad.on( 'progress', function( instance, image ) {
							  var result = image.isLoaded ? 'loaded' : 'broken';
							  //console.log( 'image is ' + result + ' for ' + image.img.src );
							  imgLoad.off( 'progress');
							});

							imgLoad.on( 'always', function( instance ) {

								if(navigate_Photos == 'append')   $element.append( template );
								if(navigate_Photos == 'prepend')  $element.prepend( template );

								$li = $element.children('li');

							 	init_AnimOnScroll($scope.id,0);

							 	$(document).on("scroll", function(){
									 scrollListner();
									 changePageOnScroll();
								});

							 	imgLoad.off( 'always');
							 	$scope.$emit('next_page_loading_complete',page_number);

							});
						
					})

					$(document).off('scroll');

				}

			}

			$(document).on("scroll", function(){
				 scrollListner();
			});


			init_AnimOnScroll = function(element, viewportFactor) {
				new AnimOnScroll( document.getElementById( element ), {
						minDuration : 0.4,
						maxDuration : 0.7,
						viewportFactor : viewportFactor
				} );
			}

			init_AnimOnScroll($scope.id, 0.2);

			$scope.$watch('page_number',function(n,o){
				if(n != o && n > 0) { 
					$location.search('page', n);
				}
			})

			var imgLoad = imagesLoaded($element);
				
				imgLoad.on( 'progress', function( instance, image ) {
					var result = image.isLoaded ? 'loaded' : 'broken';
					//console.log( 'image is ' + result + ' for ' + image.img.src );
					imgLoad.off( 'progress');
				});

			/*	imgLoad.on( 'always', function( instance ) {
				 	imgLoad.off( 'always');
				 	$('.ui.sticky')
								  .sticky({
								    context: '#Main'
								  });
				});*/

		}
	}
});

phb.directive('photoItemInList', function(helpers){
	
	return function($scope, $element, $attr){

		$scope.$applyAsync(function(){
			$($element).find('.author').popup({
			    popup : $($element).find('.popup'),
			    on    : 'hover'
			});
		});

		var hash = $attr.baseColor; var rgb = parseInt(hash.substring(1,3),16) + ','+ parseInt(hash.substring(3,5),16) + ','+ parseInt(hash.substring(5,7),16);

		if( helpers.colorBrightness(rgb) ) $($element).find('.dimmer').addClass('blackcolor');

		$($element).find('.image_overflow').css({background:hash})

		$($element).find('.dimmer').css({background : "radial-gradient(rgba("+rgb+",0.7), rgba("+rgb+",0.9))"})
	    
		$($element).children('a').dimmer({on: 'hover'});

		$($element).find('.image').velocity('stop').velocity({scale:1.05},0);
		
		$($element).children('a').hover(
			function(){
				$(this).find('.top').velocity('stop').velocity({paddingTop:15},300,[.44,.2,.33,.63]);
				$(this).find('.bottom').velocity('stop').velocity({paddingBottom:15},300,[.44,.2,.33,.63]);
				$(this).find('.image').velocity('stop').velocity({scale:1},320,[.49,.15,.27,.83]);
			},
			function(){
				$(this).find('.top').velocity('stop').velocity({paddingTop:0},300,[.44,.2,.33,.63]);
				$(this).find('.bottom').velocity('stop').velocity({paddingBottom:0},300,[.44,.2,.33,.63]);
				$(this).find('.image').velocity('stop').velocity({scale:1.05},320,[.49,.15,.27,.83]);
		})

	}
	
})

phb.directive('createdAt', function($timeout, $filter) {
	
	return function(scope, element, attrs) {

		var time = attrs.createdAt;
		var intervalLength = 30000;
		var filter = $filter('date_from_now');

		function updateTime(){
			element.text(filter(time));
		}

		function updateLater(){
			timeoutId = $timeout(function() {
				updateTime();
				updateLater();
			}, intervalLength);
		}

		element.bind('$destroy', function(){
			$timeout.cancel(timeoutId);
		})

		updateTime(); updateLater();

	}

})


/*controllers*/	

phb.controller('Photos', function($scope, $location, $http, $compile){

	

});


phb.run(['$rootScope', function($rootScope) {    

}]);