!function(){"use strict";function photoItemInList(helpers){return function($scope,$element,$attr){var $link=($($element).find(".author"),$($element).children("a")),$image=$($element).find(".image"),$top=$($element).find(".top"),$bottom=$($element).find(".bottom"),hash=$attr.baseColor,rgb=parseInt(hash.substring(1,3),16)+","+parseInt(hash.substring(3,5),16)+","+parseInt(hash.substring(5,7),16);helpers.colorBrightness(rgb)&&$($element).find(".dimmer").addClass("blackcolor"),$($element).find(".image_overflow").css({background:hash}),$($element).find(".dimmer").css({background:"radial-gradient(rgba("+rgb+",0.433), rgba("+rgb+",0.92))"}),$link.dimmer({on:"hover"}),$image.velocity("stop").velocity({scale:1.05},0),$link.hover(function(){$top.velocity("stop").velocity({translateY:15},300,[.44,.2,.33,.63]),$bottom.velocity("stop").velocity({translateY:-15},300,[.44,.2,.33,.63]),$image.velocity("stop").velocity({scale:1},320,[.49,.15,.27,.83])},function(){$top.velocity("stop").velocity({translateY:0},300,[.44,.2,.33,.63]),$bottom.velocity("stop").velocity({translateY:0},300,[.44,.2,.33,.63]),$image.velocity("stop").velocity({scale:1.05},320,[.49,.15,.27,.83])}),$element.bind("$destroy",function(){$link.dimmer("destroy"),$scope.$destroy()})}}angular.module("phb").directive("photoItemInList",photoItemInList),photoItemInList.$inject=["helpers"]}();