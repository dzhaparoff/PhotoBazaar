!function(){"use strict";function photosPaginator($rootScope){return{restrict:"A",replace:!0,template:"<div></div>",link:function($scope){$scope.pagenumber=$rootScope.page_number}}}angular.module("phb").directive("photosPaginator",photosPaginator),photosPaginator.$inject=["$rootScope","ngProgress"]}();