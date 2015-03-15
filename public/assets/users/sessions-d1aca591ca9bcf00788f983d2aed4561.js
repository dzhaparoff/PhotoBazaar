window.addEventListener("mousemove", function(e){

	var offsetX = ((1 - (document.body.clientWidth - e.clientX)/document.body.clientWidth) * 20 + 40).toFixed(2);
	var offsetY = ((1 - (document.body.clientHeight - e.clientY)/document.body.clientHeight) * 20 + 40).toFixed(2);

	$('#LoginForm').css({ backgroundPositionX: offsetX + '%', backgroundPositionY: offsetY + '%'});

},false);


window.addEventListener('deviceorientation', function(eventData) {

  var yTilt = ( ( 1 - ( -eventData.beta + 90) / 180 ) * 20 + 40).toFixed(2);

  var xTilt = ( ( 1 - ( -eventData.gamma + 90) / 180 ) * 20 + 40).toFixed(2);

  $('#LoginForm').css({ backgroundPositionX: xTilt + '%', backgroundPositionY: yTilt + '%'});


}, false);
