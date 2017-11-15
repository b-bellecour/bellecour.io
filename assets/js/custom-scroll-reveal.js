
//custom scroll reveal, adding classe.

     window.sr = ScrollReveal({ reset: true });
     sr.reveal('.cd-timeline-content', {duration: 400});
     sr.reveal('.cd-date', { duration: 400 });
     sr.reveal('.cd-timeline-img', { duration: 400 });
     sr.reveal('.cd-picture', { duration: 400 });
     sr.reveal('.skills', { duration: 800 });
     sr.reveal('.actions', { duration: 400 });
     
 
// trigger on scroll

$(function() {

  var $window           = $(window),
      win_height_padded = $window.height() * 1.1,
      isTouch           = Modernizr.touch;

  if (isTouch) { $('.revealOnScroll').addClass('progress'); }

  $window.on('scroll', revealOnScroll);

  function revealOnScroll() {
    var scrolled = $window.scrollTop(),
        win_height_padded = $window.height() * 1.1;

    // Showed...
    $(".revealOnScroll:not(.progress)").each(function () {
      var $this     = $(this),
          offsetTop = $this.offset().top;

      if (scrolled + win_height_padded > offsetTop) {
        if ($this.data('timeout')) {
          window.setTimeout(function(){
            $this.addClass('progress ' + $this.data('animation'));
          }, parseInt($this.data('timeout'),10));
        } else {
          $this.addClass('progress ' + $this.data('animation'));
        }
      }
    });
    // Hidden...
   $(".revealOnScroll.progress").each(function (index) {
      var $this     = $(this),
          offsetTop = $this.offset().top;
      if (scrolled + win_height_padded < offsetTop) {
        $(this).removeClass('progress')
      }
    });
  }

  revealOnScroll();
});

$(document).ready( function() {
    $("#skills1").hide(); //hide your div initially
    var topOfOthDiv = $("#skills1").offset().top;
    $(window).scroll(function() {
        if($(window).scrollTop() > topOfOthDiv) { //scrolled past the other div?
            $("#skills1").show(); //reached the desired point -- show div
        }
    });
});
