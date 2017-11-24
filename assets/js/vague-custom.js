
var $window = $(window),
    $main = $('.mainIframe');
    $blurred = $('.blurred');
var vague = $blurred.find('iframe').Vague({
  intensity:5 //blur intensity
});
vague.blur();

var scrollIframe = function () {
  $blurred.find('iframe').css({
    top: -$blurred.offset().top
  });
};
$window.on('scroll',scrollIframe);

scrollIframe();