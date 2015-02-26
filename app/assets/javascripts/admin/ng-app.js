/*ANGULAR*/

	var mpxAdmin = angular.module('mpxAdmin', ['ngCollection','ngResource','contenteditable','pasvaz.bindonce']); //https://github.com/tomkuk/angular-collection

	mpxAdmin.config(['$resourceProvider', function($resourceProvider) {	  
	  $resourceProvider.defaults.stripTrailingSlashes = false;
	}]);

	/*factories*/	

	mpxAdmin.factory("Api", function($resource){ 	
		    return { 
		    		Categories: $resource('/admin/api/categories/:id', {id: '@id'},
		    			{
		    				update : {
		    					method : "PUT"
		    				}
		    			}
		    			),
		    		Photos: 	$resource('/admin/api/photos/:id', {id: '@id'},
		    			{
		    				update : {
		    					method : "PUT"
		    				}
		    			}),
		    		Photographers: 	$resource('/admin/api/photographers/:id', {id: '@id'},
		    			{
		    				update : {
		    					method : "PUT"
		    				}
		    			}),
		    		Cameras: 	$resource('/admin/api/cameras/:id', {id: '@id'},
		    			{
		    				update : {
		    					method : "PUT"
		    				}
		    			})
		    	}
	})

	mpxAdmin.factory("CurrentCollections", function($http){
		return {
			getPhotos: function() {
	            return $http.get('/admin/api/get_photos');
        	}
		}
	})

	mpxAdmin.factory("Search",function(){
		return {
			fh_photos : new Object(),
			fl_photos : new Object()
		}
	})

	/*end*factories*/


	/*directives*/

	mpxAdmin.directive('photo', function ($http) {       
    return {
    	restrict: 'E',

        link: function(scope, element, attrs) {   
            	
        	element.find('.dimmer')
			  .dimmer({
			    on: 'hover'
			  })
			;

			element.find('.fbox').click(function(event){
				event.preventDefault();
				$.fancybox.showLoading();

				$http.post('/admin/api/get_photo', {id : attrs.photoId, image_size: 2048 })
					 .then(function(responce){
					  	console.log(responce.data.photo.image_url)
					 	$.fancybox.open({
							href: responce.data.photo.image_url,
							type: "image",
							padding:0,
						 	helpers: {
			           			overlay: {
			           				locked: false
			           			}
			         		},
							afterOpen:function(){
								$.fancybox.hideLoading();
							}
						})

					 });
				
			});	

        }
    }
	});

	/*end*directives*/


	/*controllers*/
	mpxAdmin.controller('MainController', function (Api, $scope) {

		$scope.categories = Api.Categories.query();
	
		$scope.$watchCollection(
			"categories",
				function( newValue, oldValue ) {
					if(newValue.length > 0) $('.CategoryModel').dimmer('hide');
				}
		);

	});

	mpxAdmin.controller('Dashboard', function(Api, Search, $scope){
		

	})

	mpxAdmin.controller('PhotosPage', function(Api, Search, $scope){

		$scope.remove_photo = remove_photo;
		$scope.hidden_prods = {};

		function remove_photo(id){
			$.fancybox.showLoading();
			$scope.selected_photo = Api.Photos.get({id:id}, function(r){
				r.$delete(function(){
					$scope.hidden_prods[id] = true;
					$.fancybox.hideLoading();
				});
			});
		}
		
	})

	mpxAdmin.controller('PhotographersPage', function(Api, Search, $scope){
		
	})


	mpxAdmin.controller('CategoryTable',function(Api, $scope, $http, $timeout) {

		$scope.buttonsShowApply = false;
		$scope.buttonsShowEdit = false;
		$scope.CategoryLock = false;

		$scope.category_row_class = [];
		$scope.category = [];	

		$scope.new = function() {
			$scope.category = new Api.Categories();
			$scope.categories.push($scope.category);	
			$scope.enableEditing($scope.category);
			$scope.active($scope.category,'warning', 'lock');
			$scope.buttonsShowEdit = false;
		}		

		$scope.edit = function(category) {
			$scope.enableEditing(category);
			$scope.active(category,'warning', 'lock');
		}

		$scope.save = function(category) {
			if(category.id > 0) {
				category.$update(function() {			 	
					$scope.disableEditing(category);
					$scope.active(category,'positive','unlock');
					$scope.buttonsShowApply = false;
				});
			}
			else {
				category.$save(function() {		 	
					$scope.disableEditing(category);
					$scope.active(category,'positive','unlock');
					$scope.buttonsShowApply = false;
				});
			}
			
		}

		$scope.remove = function(category) {			
			$scope.active(category,'negative','unlock');
			$scope.buttonsShowApply = false;

			category.$remove(function(){
				_.remove($scope.categories,category);
			});
		}

		$scope.cancel = function(category) {			
			$scope.buttonsShowApply = false;
			$scope.disableEditing(category);
			$scope.active(category,'','unlock');			
		}

		$scope.active = function(category, class_name, lock) {

			if ( lock == 'lock' )   {
				$scope.category_row_class = [];
				$scope.category_row_class[category.id] = class_name;
				$scope.CategoryLock = true;
			}

			else if ( lock == 'unlock' ) {
				$scope.category_row_class = [];
				$scope.category_row_class[category.id] = class_name;
				$scope.CategoryLock = false;			
			}

			else if ( lock == 'watch' )  {				
				if ( $scope.CategoryLock != true ) {
					$scope.category = category;
					$scope.category_row_class = [];
					$scope.category_row_class[category.id] = class_name;
					$scope.buttonsShowEdit = true;
				}
			}

		}

		$scope.disableEditing = function(category){
			category.editable = false;
		}

		$scope.enableEditing = function(category){
			$scope.buttonsShowApply = true;
			$scope.buttonsShowEdit = false;
			category.editable = true;
		}

		$scope.$watchCollection(
			"category",
				function( newValue, oldValue ) {
					/*if(newValue.id == oldValue.id && !_.isEmpty(oldValue) && !_.isEmpty(newValue))
						$scope.active(newValue, 'warning', 'lock');*/
				}
		);	

	});

	mpxAdmin.controller('PhotosFhFormController', function (Api, Search, $scope, $http, $timeout, $rootScope) {  

			$scope.formData = {};
			$scope.formSort = 
				[
				{name:'Текущему рейтингу', value:"rating"},
				{name:'Макс. рейтингу', value:"highest_rating"},
				{name:'Кол-ву лайков', value:"votes_count"},
				{name:'Дате', value:"created_at"},
				];

			$scope.formRpp = 
				[
				{name:'5', value: 5},
				{name:'10', value: 10},
				{name:'25', value: 25},
				{name:'50', value: 50},
				{name:'100', value: 100},
				];

			$scope.processForm = function(event) {
				$scope.loading = "loading";
				
				$http.post('/admin/api/fh_check', {formData : $scope.formData })
					 .then(function(responce){
					  	$scope.loading = "";					 	
					 	Search.fh_photos = responce.data.photos;
					 	$rootScope.$broadcast('PhotosFound', responce.data.total_items);
					 });
			   
			};

	});	


	mpxAdmin.controller('PhotosSearchResult', function (Api, Search, CurrentCollections, $scope, $http, $rootScope, $timeout) {	

		$scope.photosFound = 0;
		$scope.fh_photos = {};		

		$rootScope.$on('PhotosFound', function(event, size) {
			$scope.photosFound = size;
			$scope.fh_photos = Search.fh_photos;	
		});

		$scope.photoExist = {};
		
		CurrentCollections.getPhotos().success(function(data){
			_.each(data, function(i){
				$scope.photoExist[i] = true;
			})

		});

		$scope.addPhoto = function(photo) {
			
			var ph = new Api.Photos();
			var photographer = new Api.Photographers();
			var camera = new Api.Cameras();

			$('#Photo_' + photo.id).dimmer('show').find('.dimmer').last().append('<div class="ui large loader"></div>');

			ph = _.extend(ph, _.omit(photo, "id"));
			ph.photo_id = photo.id;

			photographer = _.extend(photographer, _.omit(photo.user, "id"));
			photographer.user_id = photo.user.id;

			camera.name = photo.camera;

			photographer.$save(function(photographer){
				
				ph.photographer_id = photographer.id;
				//$scope.photographers.push(photographer);
				camera.$save(function(camera){
					ph.camera_id = camera.id;
					ph.category_id = photo.category;
					$scope.photoExist[photo.id] = true;
					//$scope.cameras.push(camera);
						ph.$save(function(data){
							//$scope.photos.push(data);
							$('#Photo_' + photo.id).dimmer('hide');
						});
				})
				
			})

			}
		
	});

	/*end*controllers*/

/*end*Angular*/


mpxAdmin.run(['$rootScope','$collection', function($rootScope,$collection) {    
	$('.Model').dimmer('show');
}]);