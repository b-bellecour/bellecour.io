
//custom scroll reveal, adding classe.

     window.sr = ScrollReveal({ reset: true });
     sr.reveal('.cd-timeline-content', {duration: 400});
     sr.reveal('.cd-date', { duration: 400 });
     sr.reveal('.cd-timeline-img', { duration: 400 });
     sr.reveal('.cd-picture', { duration: 400 });
     sr.reveal('.skills', { duration: 800 });
     sr.reveal('.actions', { duration: 400 });
     
 
// trigger on scroll

// $(function scrollTrigger() {

//  var $window           = $(window),
//      win_height_padded = $window.height() * 1.1,
//     isTouch           = Modernizr.touch;

//   if (isTouch) { $('.revealOnScroll').addClass('progress'); }

//   $window.on('scroll', revealOnScroll);

//   function revealOnScroll() {
//     var scrolled = $window.scrollTop(),
//         win_height_padded = $window.height() * 1.1;

//     // Showed...
//     $(".revealOnScroll:not(.progress)").each(function () {
//       var $this     = $(this),
//           offsetTop = $this.offset().top;

//       if (scrolled + win_height_padded > offsetTop) {
//           $this.addClass('progress ');
//           $("#skills1").show();    
//       }
//     });
//     // Hidden...
//    $(".revealOnScroll.progress").each(function (index) {
//       var $this     = $(this),
//           offsetTop = $this.offset().top;
//       if (scrolled + win_height_padded < offsetTop) {
//         $(this).removeClass('progress')
//         $("#skills1").hide();
//       }
//     });
//   }

//   setTimeout(revealOnScroll, 4000);

// });

$(document).ready(function($) {
    $('a[href^="#"]').bind('click.smoothscroll', function(e) {
        e.preventDefault();
        
        // Get the current target hash
        var target = this.hash;
        
        // Animate the scroll bar action so its smooth instead of a hard jump
        $('html, body').stop().animate({
            'scrollTop' : $(target).offset().top
        }, 900, 'swing', function() {
            window.location.hash = target;
        });
    });
});