!function(){"use strict";function PageLoader($http){return{getPageFullContent:function(path){return path=new Url(path),path.query.mode="ajax_page_load",$http.get(path.toString())}}}angular.module("phb").factory("PageLoader",PageLoader),PageLoader.$inject=["$http"]}();