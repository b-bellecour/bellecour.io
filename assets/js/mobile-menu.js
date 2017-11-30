$('.open-menu').on('click', function() {
  $(".overlay-menu").fadeIn("slow");
  $('#blurry-wrapper').addClass('modal-trigger');
  $('#mobile').addClass('hiderino');
});

$('.close-menu').on('click', function() {
  $(".overlay-menu").fadeOut("slow");
  $('#blurry-wrapper').removeClass('modal-trigger');
  $('#mobile').removeClass('hiderino');
});


