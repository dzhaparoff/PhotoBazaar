!function(){"use strict";function photoDetailController($scope,$location){function getNewImageSize(){page_height=window.innerHeight,self.mainImage.imageHeight=page_height-200,self.mainImage.imageStyle={"max-height":self.mainImage.imageHeight}}function applyNewImageSize(){$scope.$applyAsync(getNewImageSize)}var page_height=window.innerHeight,self=this;this.mainImage={},this.mainImage.containerStyle={},this.mainImage.imageStyle={},getNewImageSize(),window.addEventListener("resize",applyNewImageSize,!1),$scope.$on("$destroy",function(){window.removeEventListener("resize",applyNewImageSize,!1)}),this.showPrevPhoto=function(e,$attr){37==e&&$scope.$apply(function(){$location.url($attr.href)})},this.showNextPhoto=function(e,$attr){39==e&&$scope.$apply(function(){$location.url($attr.href)})},this.toggleFullRes=function(e,$attr){77==e&&$scope.$apply(function(){var width=$attr.width,height=$attr.height;return $(".photo.column").height()>=height?!1:void(self.mainImage.containerStyle.height==height?(delete self.mainImage.containerStyle.height,delete self.mainImage.rowClass):(self.mainImage.containerStyle.height=height,self.mainImage.rowClass=["maximized","mouse_pan_active"],width<=$(".photo.column").width()&&self.mainImage.rowClass.push("small"),height>width&&self.mainImage.rowClass.push("vertical")))})}}angular.module("phb").controller("photoDetailController",photoDetailController),photoDetailController.$inject=["$scope","$location"]}();