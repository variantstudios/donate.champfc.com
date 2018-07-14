function queryString() {
  var queryString = window.location.search;
  var varArray = queryString.split('&');
  for (var i = 0; i < varArray.length; i++) {
    var param = varArray[i].split('=');
    return param[1];
  }
}
if (queryString() == '200') {
	$('#stripe-message-success').show();
	$('#stripe-message-fail').hide();
	$('html, body').animate(
		{
			scrollTop: $('.stripe-button-el').offset().top
		},
		1000
	);
	console.log('200');
} else if (queryString() == '400') {
	$('#stripe-message-success').hide();
	$('#stripe-message-fail').show();
	$('html, body').animate(
		{
			scrollTop: $('.stripe-button-el').offset().top
		},
		1000
	);
	console.log('400');
} else {
	$('#stripe-message-success').hide();
	$('#stripe-message-fail').hide();
	console.log('hide');
}
