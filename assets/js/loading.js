'use strict';

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// super simple router - go to page specified in hash, otherwise go to "default"
function router(route) {
  var pageName = route ? route : $('.default.page').attr('data-page-name');
  var $page = $('[data-page-name="' + pageName + '"]');
  $('.page').css('display', 'none');
  $('[data-page]').removeClass('active');
  $('[data-page="' + pageName + '"]').addClass('active');
  $page.css('display', 'block');
}
router();

// fake loader
var progress = 0;
var fakeLoaderInterval = window.setInterval(function () {
  var $lp = $('.loading-progress');
  progress = progress + getRandomArbitrary(10, 25);
  $lp.css('transform', 'translateX(' + progress + '%)');

  if (progress >= 75) {
    window.clearInterval(fakeLoaderInterval);
    $lp.css('transform', 'translateX(100%)');
    setTimeout(function () {
      return $('.loading').css('transform', 'translateY(calc(100% + 10px))');
    }, 400);
  }
}, getRandomArbitrary(100, 500));

// navigation
$('.main-nav li a').on('click', function (e) {
  var $this = $(e.currentTarget);
  var route = $this.attr('data-page');

  $('.main-nav li a').removeClass('active');
  $this.addClass('active');
  router(route);
});