!function(){"use strict";function photoLink($timeout,$compile,PageLoader){return function($scope,$element,$attr){function compile_and_show(d){var $template=$compile($(d))($scope);cache=document.getElementsByClassName("pusher").innerHtml,$("body .pusher").empty(),$("body").append($template),window.onpopstate=function(){close_photo_detail()}}function close_photo_detail(){return null==cache?!1:($("body .partial.photo_detail").remove(),void(document.getElementsByClassName("pusher").innerHtml=cache))}var compile_and_show,close_photo_detail,photo={id:$attr.photoId,link:$attr.href},cache=null;$element.click(function(){$scope.$emit("disableLocationListener",!0),PageLoader.getPageFullContent(photo.link).success(compile_and_show)})}}angular.module("phb").directive("photoLink",photoLink)}();