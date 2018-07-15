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

//var a = $('input[name=donationOptions]:checked').val(); //getter

var a = $('input#donationAmount').val();

$('.stripe-button').attr('data-amount',a); //setter

var formAction = $('#stripeForm').attr('action');

var text = formAction;

var newText = text.replace(/(amount=).*?(&|$)/,'$1' + a + '$2');

$('#stripeForm').attr('action', newText);

//console.log(newText);
//$( 'input[name=donationOptions]' ).click(function() {
$('input#donationAmount').blur(function() {
  var a = $('input#donationAmount').val(); 
  var newText = text.replace(/(amount=).*?(&|$)/,'$1' + a + '$2');
  $('#stripeForm').attr('action', newText);
  $('.stripe-button').attr('data-amount',a);

});

// function validateNumber(event) {
//   var key = window.event ? event.keyCode : event.which;
//   if (event.keyCode === 8 || event.keyCode === 46) {
//     return true;
//   } else if ( key < 48 || key > 57 ) {
//     return false;
//   } else {
//     return true;
// }
// };
// $(document).ready(function(){
//   $('[id^=donationAmount]').keypress(validateNumber);
// });