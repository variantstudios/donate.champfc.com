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

var a = $('input[name=donationOptions]:checked').val(); //getter

$('.stripe-button').attr('data-amount',a); //setter

var paramName = 'amount';
var formAction = $('#stripeForm').attr('action');
// $('#language li').click( function(e) {
//   $('#languageLink').attr('href', function(i,a){
//     var tmpRegex = new RegExp('(' + paramName + '=)[a-z]+', 'ig');
//     return a.replace(tmpRegex, '$1'+e.target.dataset.language);
//   });
// });
// $(formAction).attr('href', function(i,a){
// 	var tmpRegex = new RegExp('(' + paramName + '=)[a-z]+', 'ig');
// 	return a.replace(tmpRegex, '$1'+e.target.dataset.language);
// });

//$('#stripeForm').attr('action').set('amount', 42);


var text = formAction;

var newText = text.replace(/(amount=).*?(&|$)/,'$1' + a + '$2');

$('#stripeForm').attr('action', newText);

//console.log(newText);
$( 'input[name=donationOptions]' ).click(function() {

	var a = $('input[name=donationOptions]:checked').val(); 
	var newText = text.replace(/(amount=).*?(&|$)/,'$1' + a + '$2');
	$('#stripeForm').attr('action', newText);
	$('.stripe-button').attr('data-amount',a);

});