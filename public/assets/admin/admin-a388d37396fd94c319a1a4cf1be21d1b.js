function init_interface(){$(".ui.form select").dropdown(),$(".selection.dropdown").dropdown("setting",{onChange:function(value,text,$choice){$choice.parents(".dropdown").find(".hidden_input").val(value).trigger("input")}})}!function(){"use strict";var e=angular.module("pasvaz.bindonce",[]);e.directive("bindonce",function(){var e=function(e){if(e&&0!==e.length){var t=angular.lowercase(""+e);e=!("f"===t||"0"===t||"false"===t||"no"===t||"n"===t||"[]"===t)}else e=!1;return e},t=parseInt((/msie (\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10);isNaN(t)&&(t=parseInt((/trident\/.*; rv:(\d+)/.exec(angular.lowercase(navigator.userAgent))||[])[1],10));var r={restrict:"AM",controller:["$scope","$element","$attrs","$interpolate",function(r,a,i,n){var c=function(t,r,a){var i="show"===r?"":"none",n="hide"===r?"":"none";t.css("display",e(a)?i:n)},o=function(e,t){if(angular.isObject(t)&&!angular.isArray(t)){var r=[];angular.forEach(t,function(e,t){e&&r.push(t)}),t=r}t&&e.addClass(angular.isArray(t)?t.join(" "):t)},s=function(e,t){e.transclude(t,function(t){var r=e.element.parent(),a=e.element&&e.element[e.element.length-1],i=r&&r[0]||a&&a.parentNode,n=a&&a.nextSibling||null;angular.forEach(t,function(e){i.insertBefore(e,n)})})},l={watcherRemover:void 0,binders:[],group:i.boName,element:a,ran:!1,addBinder:function(e){this.binders.push(e),this.ran&&this.runBinders()},setupWatcher:function(e){var t=this;this.watcherRemover=r.$watch(e,function(e){void 0!==e&&(t.removeWatcher(),t.checkBindonce(e))},!0)},checkBindonce:function(e){var t=this,r=e.$promise?e.$promise.then:e.then;"function"==typeof r?r(function(){t.runBinders()}):t.runBinders()},removeWatcher:function(){void 0!==this.watcherRemover&&(this.watcherRemover(),this.watcherRemover=void 0)},runBinders:function(){for(;this.binders.length>0;){var r=this.binders.shift();if(!this.group||this.group==r.group){var a=r.scope.$eval(r.interpolate?n(r.value):r.value);switch(r.attr){case"boIf":e(a)&&s(r,r.scope.$new());break;case"boSwitch":var i,l=r.controller[0];(i=l.cases["!"+a]||l.cases["?"])&&(r.scope.$eval(r.attrs.change),angular.forEach(i,function(e){s(e,r.scope.$new())}));break;case"boSwitchWhen":var u=r.controller[0];u.cases["!"+r.attrs.boSwitchWhen]=u.cases["!"+r.attrs.boSwitchWhen]||[],u.cases["!"+r.attrs.boSwitchWhen].push({transclude:r.transclude,element:r.element});break;case"boSwitchDefault":var u=r.controller[0];u.cases["?"]=u.cases["?"]||[],u.cases["?"].push({transclude:r.transclude,element:r.element});break;case"hide":case"show":c(r.element,r.attr,a);break;case"class":o(r.element,a);break;case"text":r.element.text(a);break;case"html":r.element.html(a);break;case"style":r.element.css(a);break;case"disabled":r.element.prop("disabled",a);break;case"src":r.element.attr(r.attr,a),t&&r.element.prop("src",a);break;case"attr":angular.forEach(r.attrs,function(e,t){var a,i;t.match(/^boAttr./)&&r.attrs[t]&&(a=t.replace(/^boAttr/,"").replace(/([a-z])([A-Z])/g,"$1-$2").toLowerCase(),i=r.scope.$eval(r.attrs[t]),r.element.attr(a,i))});break;case"href":case"alt":case"title":case"id":case"value":r.element.attr(r.attr,a)}}}this.ran=!0}};angular.extend(this,l)}],link:function(e,t,r,a){var i=r.bindonce&&e.$eval(r.bindonce);void 0!==i?a.checkBindonce(i):(a.setupWatcher(r.bindonce),t.bind("$destroy",a.removeWatcher))}};return r}),angular.forEach([{directiveName:"boShow",attribute:"show"},{directiveName:"boHide",attribute:"hide"},{directiveName:"boClass",attribute:"class"},{directiveName:"boText",attribute:"text"},{directiveName:"boBind",attribute:"text"},{directiveName:"boHtml",attribute:"html"},{directiveName:"boSrcI",attribute:"src",interpolate:!0},{directiveName:"boSrc",attribute:"src"},{directiveName:"boHrefI",attribute:"href",interpolate:!0},{directiveName:"boHref",attribute:"href"},{directiveName:"boAlt",attribute:"alt"},{directiveName:"boTitle",attribute:"title"},{directiveName:"boId",attribute:"id"},{directiveName:"boStyle",attribute:"style"},{directiveName:"boDisabled",attribute:"disabled"},{directiveName:"boValue",attribute:"value"},{directiveName:"boAttr",attribute:"attr"},{directiveName:"boIf",transclude:"element",terminal:!0,priority:1e3},{directiveName:"boSwitch",require:"boSwitch",controller:function(){this.cases={}}},{directiveName:"boSwitchWhen",transclude:"element",priority:800,require:"^boSwitch"},{directiveName:"boSwitchDefault",transclude:"element",priority:800,require:"^boSwitch"}],function(t){var r=200;return e.directive(t.directiveName,function(){var e={priority:t.priority||r,transclude:t.transclude||!1,terminal:t.terminal||!1,require:["^bindonce"].concat(t.require||[]),controller:t.controller,compile:function(e,r,a){return function(e,r,i,n){var c=n[0],o=i.boParent;if(o&&c.group!==o){var s=c.element.parent();c=void 0;for(var l;9!==s[0].nodeType&&s.length;){if((l=s.data("$bindonceController"))&&l.group===o){c=l;break}s=s.parent()}if(!c)throw new Error("No bindonce controller: "+o)}c.addBinder({element:r,attr:t.attribute||t.directiveName,attrs:i,value:i[t.directiveName],interpolate:t.interpolate,group:o,transclude:a,controller:n.slice(1),scope:e})}}};return e})})}(),function(window,angular,undefined){"use strict";function isValidDottedPath(path){return null!=path&&""!==path&&"hasOwnProperty"!==path&&MEMBER_NAME_REGEX.test("."+path)}function lookupDottedPath(obj,path){if(!isValidDottedPath(path))throw $resourceMinErr("badmember",'Dotted member path "@{0}" is invalid.',path);for(var keys=path.split("."),i=0,ii=keys.length;ii>i&&obj!==undefined;i++){var key=keys[i];obj=null!==obj?obj[key]:undefined}return obj}function shallowClearAndCopy(src,dst){dst=dst||{},angular.forEach(dst,function(value,key){delete dst[key]});for(var key in src)!src.hasOwnProperty(key)||"$"===key.charAt(0)&&"$"===key.charAt(1)||(dst[key]=src[key]);return dst}var $resourceMinErr=angular.$$minErr("$resource"),MEMBER_NAME_REGEX=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;angular.module("ngResource",["ng"]).provider("$resource",function(){var provider=this;this.defaults={stripTrailingSlashes:!0,actions:{get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}}},this.$get=["$http","$q",function($http,$q){function encodeUriSegment(val){return encodeUriQuery(val,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function encodeUriQuery(val,pctEncodeSpaces){return encodeURIComponent(val).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,pctEncodeSpaces?"%20":"+")}function Route(template,defaults){this.template=template,this.defaults=extend({},provider.defaults,defaults),this.urlParams={}}function resourceFactory(url,paramDefaults,actions,options){function extractParams(data,actionParams){var ids={};return actionParams=extend({},paramDefaults,actionParams),forEach(actionParams,function(value,key){isFunction(value)&&(value=value()),ids[key]=value&&value.charAt&&"@"==value.charAt(0)?lookupDottedPath(data,value.substr(1)):value}),ids}function defaultResponseInterceptor(response){return response.resource}function Resource(value){shallowClearAndCopy(value||{},this)}var route=new Route(url,options);return actions=extend({},provider.defaults.actions,actions),Resource.prototype.toJSON=function(){var data=extend({},this);return delete data.$promise,delete data.$resolved,data},forEach(actions,function(action,name){var hasBody=/^(POST|PUT|PATCH)$/i.test(action.method);Resource[name]=function(a1,a2,a3,a4){var data,success,error,params={};switch(arguments.length){case 4:error=a4,success=a3;case 3:case 2:if(!isFunction(a2)){params=a1,data=a2,success=a3;break}if(isFunction(a1)){success=a1,error=a2;break}success=a2,error=a3;case 1:isFunction(a1)?success=a1:hasBody?data=a1:params=a1;break;case 0:break;default:throw $resourceMinErr("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var isInstanceCall=this instanceof Resource,value=isInstanceCall?data:action.isArray?[]:new Resource(data),httpConfig={},responseInterceptor=action.interceptor&&action.interceptor.response||defaultResponseInterceptor,responseErrorInterceptor=action.interceptor&&action.interceptor.responseError||undefined;forEach(action,function(value,key){"params"!=key&&"isArray"!=key&&"interceptor"!=key&&(httpConfig[key]=copy(value))}),hasBody&&(httpConfig.data=data),route.setUrlParams(httpConfig,extend({},extractParams(data,action.params||{}),params),action.url);var promise=$http(httpConfig).then(function(response){var data=response.data,promise=value.$promise;if(data){if(angular.isArray(data)!==!!action.isArray)throw $resourceMinErr("badcfg","Error in resource configuration for action `{0}`. Expected response to contain an {1} but got an {2}",name,action.isArray?"array":"object",angular.isArray(data)?"array":"object");action.isArray?(value.length=0,forEach(data,function(item){value.push("object"==typeof item?new Resource(item):item)})):(shallowClearAndCopy(data,value),value.$promise=promise)}return value.$resolved=!0,response.resource=value,response},function(response){return value.$resolved=!0,(error||noop)(response),$q.reject(response)});return promise=promise.then(function(response){var value=responseInterceptor(response);return(success||noop)(value,response.headers),value},responseErrorInterceptor),isInstanceCall?promise:(value.$promise=promise,value.$resolved=!1,value)},Resource.prototype["$"+name]=function(params,success,error){isFunction(params)&&(error=success,success=params,params={});var result=Resource[name].call(this,params,this,success,error);return result.$promise||result}}),Resource.bind=function(additionalParamDefaults){return resourceFactory(url,extend({},paramDefaults,additionalParamDefaults),actions)},Resource}var noop=angular.noop,forEach=angular.forEach,extend=angular.extend,copy=angular.copy,isFunction=angular.isFunction;return Route.prototype={setUrlParams:function(config,params,actionUrl){var val,encodedVal,self=this,url=actionUrl||self.template,urlParams=self.urlParams={};forEach(url.split(/\W/),function(param){if("hasOwnProperty"===param)throw $resourceMinErr("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(param)&&param&&new RegExp("(^|[^\\\\]):"+param+"(\\W|$)").test(url)&&(urlParams[param]=!0)}),url=url.replace(/\\:/g,":"),params=params||{},forEach(self.urlParams,function(_,urlParam){val=params.hasOwnProperty(urlParam)?params[urlParam]:self.defaults[urlParam],angular.isDefined(val)&&null!==val?(encodedVal=encodeUriSegment(val),url=url.replace(new RegExp(":"+urlParam+"(\\W|$)","g"),function(match,p1){return encodedVal+p1})):url=url.replace(new RegExp("(/?):"+urlParam+"(\\W|$)","g"),function(match,leadingSlashes,tail){return"/"==tail.charAt(0)?tail:leadingSlashes+tail})}),self.defaults.stripTrailingSlashes&&(url=url.replace(/\/+$/,"")||"/"),url=url.replace(/\/\.(?=\w+($|\?))/,"."),config.url=url.replace(/\/\\\./,"/."),forEach(params,function(value,key){self.urlParams[key]||(config.params=config.params||{},config.params[key]=value)})}},resourceFactory}]})}(window,window.angular),function(window,angular){"use strict";angular.module("ngCollection",[]).factory("$collection",["$filter","$parse",function($filter,$parse){function s4(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}function guid(){return s4()+s4()+"-"+s4()+"-"+s4()+"-"+s4()+"-"+s4()+s4()+s4()}function checkValue(item,compareFn){return compareFn(item)}function Collection(options){options||(options={}),void 0!==options.comparator&&(this.comparator=options.comparator),this.idAttribute=options.idAttribute||this.idAttribute,this.current=null,this._reset(),this.initialize.apply(this,arguments)}return Collection.prototype={idAttribute:"id",initialize:function(){},add:function(obj,options){options||(options={});var id,sort,existing,index;return sort=options.sort!==!1,index=void 0!==options.index?options.index:this.array.length,obj[this.idAttribute]||(obj[this.idAttribute]=guid()),(existing=this.get(obj))?angular.extend(existing,obj):(id=obj[this.idAttribute],this.hash[id]=obj,this.array.splice(index,0,obj),this.length+=1),sort&&this.sort(),this},addAll:function(objArr,options){options||(options={});for(var sort=options.sort!==!1,i=0;i<objArr.length;i++){var obj=objArr[i];this.add(obj,angular.extend(options,{sort:!1}))}return sort&&this.sort(),this},sort:function(comparator){var comparator=comparator||this.comparator;return comparator&&(this.array=$filter("orderBy")(this.array,comparator)),this},get:function(obj){return null==obj?void 0:this.hash[obj[this.idAttribute]||obj]},find:function(expr,value,deepCompare){var compareFn=expr;if("string"==typeof expr){var parse=$parse(expr);compareFn=function(item){return deepCompare?parse(item)==value:parse(item)===value},compareFn.prototype.value=value,compareFn.prototype.deepCompare=deepCompare}for(var i=0;i<this.array.length;i++)if(checkValue(this.array[i],compareFn))return this.array[i];return void 0},where:function(expr,value,deepCompare){var results=[],compareFn=expr;if("string"==typeof expr){var parse=$parse(expr);compareFn=function(item){return deepCompare?parse(item)==value:parse(item)===value},compareFn.prototype.value=value,compareFn.prototype.deepCompare=deepCompare}for(var i=0;i<this.array.length;i++)checkValue(this.array[i],compareFn)&&results.push(this.array[i]);return results},update:function(obj){var existing;return existing=this.get(obj),existing&&angular.extend(existing,obj),existing||this.add(obj),this},remove:function(obj){var index;return index=this.array.indexOf(obj),-1===index?this:(delete this.hash[obj[this.idAttribute]],this.array.splice(index,1),this.length--,this)},removeAll:function(){for(var i=this.array.length-1;i>=0;i--)this.remove(this.at(i));return this},last:function(){return this.array[this.length-1]},at:function(index){return this.array[index]},size:function(){return this.array.length},all:function(){return this.array},_reset:function(){this.length=0,this.hash={},this.array=[]}},Collection.extend=function(protoProps){var child,parent=this;child=protoProps&&protoProps.hasOwnProperty("constructor")?protoProps.constructor:function(){return parent.apply(this,arguments)};var Surrogate=function(){this.constructor=child};return Surrogate.prototype=parent.prototype,child.prototype=new Surrogate,protoProps&&angular.extend(child.prototype,protoProps),child.extend=parent.extend,child.getInstance=Collection.getInstance,child._super=parent.prototype,child},Collection.getInstance=function(options){return new this(options)},Collection}])}(window,window.angular),angular.module("contenteditable",[]).directive("contenteditable",["$timeout",function($timeout){return{restrict:"A",require:"?ngModel",link:function(scope,element,attrs,ngModel){if(ngModel){var opts={};angular.forEach(["stripBr","noLineBreaks","selectNonEditable","moveCaretToEndOnChange"],function(opt){var o=attrs[opt];opts[opt]=o&&"false"!==o}),element.bind("input",function(){scope.$apply(function(){var html,html2,rerender;html=element.html(),rerender=!1,opts.stripBr&&(html=html.replace(/<br>$/,"")),opts.noLineBreaks&&(html2=html.replace(/<div>/g,"").replace(/<br>/g,"").replace(/<\/div>/g,""),html2!==html&&(rerender=!0,html=html2)),ngModel.$setViewValue(html),rerender&&ngModel.$render(),""===html&&$timeout(function(){element[0].blur(),element[0].focus()})})});var oldRender=ngModel.$render;ngModel.$render=function(){var el,el2,range,sel;oldRender&&oldRender(),element.html(ngModel.$viewValue||""),opts.moveCaretToEndOnChange&&(el=element[0],range=document.createRange(),sel=window.getSelection(),el.childNodes.length>0?(el2=el.childNodes[el.childNodes.length-1],range.setStartAfter(el2)):range.setStartAfter(el),range.collapse(!0),sel.removeAllRanges(),sel.addRange(range))},opts.selectNonEditable&&element.bind("click",function(e){var range,sel,target;target=e.toElement,target!==this&&"false"===angular.element(target).attr("contenteditable")&&(range=document.createRange(),sel=window.getSelection(),range.setStartBefore(target),range.setEndAfter(target),sel.removeAllRanges(),sel.addRange(range))})}}}}]);var mpxAdmin=angular.module("mpxAdmin",["ngCollection","ngResource","contenteditable","pasvaz.bindonce"]);mpxAdmin.config(["$resourceProvider",function($resourceProvider){$resourceProvider.defaults.stripTrailingSlashes=!1}]),mpxAdmin.factory("Api",["$resource",function($resource){return{Categories:$resource("/admin/api/categories/:id",{id:"@id"},{update:{method:"PUT"}}),Photos:$resource("/admin/api/photos/:id",{id:"@id"},{update:{method:"PUT"}}),Photographers:$resource("/admin/api/photographers/:id",{id:"@id"},{update:{method:"PUT"}}),Cameras:$resource("/admin/api/cameras/:id",{id:"@id"},{update:{method:"PUT"}})}}]),mpxAdmin.factory("CurrentCollections",["$http",function($http){return{getPhotos:function(){return $http.get("/admin/api/get_photos")}}}]),mpxAdmin.factory("Search",function(){return{fh_photos:new Object,fl_photos:new Object}}),mpxAdmin.directive("photo",["$http",function($http){return{restrict:"E",link:function(scope,element,attrs){element.find(".dimmer").dimmer({on:"hover"}),element.find(".fbox").click(function(event){event.preventDefault(),$.fancybox.showLoading(),$http.post("/admin/api/get_photo",{id:attrs.photoId,image_size:2048}).then(function(responce){console.log(responce),$.fancybox.open({href:responce.data.photo.image_url,type:"image",padding:0,helpers:{overlay:{locked:!1}},afterOpen:function(){$.fancybox.hideLoading()}})})})}}}]),mpxAdmin.controller("MainController",["Api","$scope",function(Api,$scope){$scope.categories=Api.Categories.query(),$scope.$watchCollection("categories",function(newValue){newValue.length>0&&$(".CategoryModel").dimmer("hide")})}]),mpxAdmin.controller("Dashboard",function(){}),mpxAdmin.controller("PhotosPage",function(Api,Search,$scope){function remove_photo(id){$.fancybox.showLoading(),$scope.selected_photo=Api.Photos.get({id:id},function(r){r.$delete(function(){$scope.hidden_prods[id]=!0,$.fancybox.hideLoading()})})}$scope.remove_photo=remove_photo,$scope.hidden_prods={}}),mpxAdmin.controller("PhotographersPage",function(){}),mpxAdmin.controller("CategoryTable",function(Api,$scope){$scope.buttonsShowApply=!1,$scope.buttonsShowEdit=!1,$scope.CategoryLock=!1,$scope.category_row_class=[],$scope.category=[],$scope.new=function(){$scope.category=new Api.Categories,$scope.categories.push($scope.category),$scope.enableEditing($scope.category),$scope.active($scope.category,"warning","lock"),$scope.buttonsShowEdit=!1},$scope.edit=function(category){$scope.enableEditing(category),$scope.active(category,"warning","lock")},$scope.save=function(category){category.id>0?category.$update(function(){$scope.disableEditing(category),$scope.active(category,"positive","unlock"),$scope.buttonsShowApply=!1}):category.$save(function(){$scope.disableEditing(category),$scope.active(category,"positive","unlock"),$scope.buttonsShowApply=!1})},$scope.remove=function(category){$scope.active(category,"negative","unlock"),$scope.buttonsShowApply=!1,category.$remove(function(){_.remove($scope.categories,category)})},$scope.cancel=function(category){$scope.buttonsShowApply=!1,$scope.disableEditing(category),$scope.active(category,"","unlock")},$scope.active=function(category,class_name,lock){"lock"==lock?($scope.category_row_class=[],$scope.category_row_class[category.id]=class_name,$scope.CategoryLock=!0):"unlock"==lock?($scope.category_row_class=[],$scope.category_row_class[category.id]=class_name,$scope.CategoryLock=!1):"watch"==lock&&1!=$scope.CategoryLock&&($scope.category=category,$scope.category_row_class=[],$scope.category_row_class[category.id]=class_name,$scope.buttonsShowEdit=!0)},$scope.disableEditing=function(category){category.editable=!1},$scope.enableEditing=function(category){$scope.buttonsShowApply=!0,$scope.buttonsShowEdit=!1,category.editable=!0},$scope.$watchCollection("category",function(){})}),mpxAdmin.controller("PhotosFhFormController",function(Api,Search,$scope,$http,$timeout,$rootScope){$scope.formData={},$scope.formSort=[{name:"\u0422\u0435\u043a\u0443\u0449\u0435\u043c\u0443 \u0440\u0435\u0439\u0442\u0438\u043d\u0433\u0443",value:"rating"},{name:"\u041c\u0430\u043a\u0441. \u0440\u0435\u0439\u0442\u0438\u043d\u0433\u0443",value:"highest_rating"},{name:"\u041a\u043e\u043b-\u0432\u0443 \u043b\u0430\u0439\u043a\u043e\u0432",value:"votes_count"},{name:"\u0414\u0430\u0442\u0435",value:"created_at"}],$scope.formRpp=[{name:"5",value:5},{name:"10",value:10},{name:"25",value:25},{name:"50",value:50},{name:"100",value:100}],$scope.processForm=function(){$scope.loading="loading",$http.post("/admin/api/fh_check",{formData:$scope.formData}).then(function(responce){$scope.loading="",Search.fh_photos=responce.data.photos,$rootScope.$broadcast("PhotosFound",responce.data.total_items)})}}),mpxAdmin.controller("PhotosSearchResult",function(Api,Search,CurrentCollections,$scope,$http,$rootScope){$scope.photosFound=0,$scope.fh_photos={},$rootScope.$on("PhotosFound",function(event,size){$scope.photosFound=size,$scope.fh_photos=Search.fh_photos}),$scope.photoExist={},CurrentCollections.getPhotos().success(function(data){_.each(data,function(i){$scope.photoExist[i]=!0})}),$scope.addPhoto=function(photo){var ph=new Api.Photos,photographer=new Api.Photographers,camera=new Api.Cameras;$("#Photo_"+photo.id).dimmer("show").find(".dimmer").last().append('<div class="ui large loader"></div>'),ph=_.extend(ph,_.omit(photo,"id")),ph.photo_id=photo.id,photographer=_.extend(photographer,_.omit(photo.user,"id")),photographer.user_id=photo.user.id,camera.name=photo.camera,photographer.$save(function(photographer){ph.photographer_id=photographer.id,camera.$save(function(camera){ph.camera_id=camera.id,ph.category_id=photo.category,$scope.photoExist[photo.id]=!0,ph.$save(function(){$("#Photo_"+photo.id).dimmer("hide")})})})}}),mpxAdmin.run(["$rootScope","$collection",function(){$(".Model").dimmer("show")}]),$(function(){$(".left.sidebar").sidebar("attach events",".launch.button"),$(".left.sidebar").sidebar("setting",{dimPage:!1}),$(".launch.button").removeClass("disabled"),init_interface(),$("a.fancybox").fancybox({padding:0,helpers:{overlay:{locked:!1}}})});