//= require angular-bindonce.js
//= require angular-resource
//= require angular-collection 
//= require angular-contenteditable 
//= require admin/ng-app.js

$(function(){

	/*SIDEBAR*/

		$('.left.sidebar').sidebar('attach events', '.launch.button');
		$('.left.sidebar').sidebar('setting', {
			dimPage : false
		});

	/*end*SIDEBAR*/


	$('.launch.button').removeClass('disabled');
			
	init_interface();

	$('a.fancybox').fancybox(
					{padding:0, helpers: {
              			overlay: {
              				locked: false
              			}
            		}});
});

function init_interface(){ 
			$('.ui.form select').dropdown();

			$('.selection.dropdown').dropdown('setting',{
				onChange: function(value, text, $choice){
					$choice.parents(".dropdown").find('.hidden_input').val(value).trigger('input');
				}
			});
}