//Slidebar //Usage: http://plugins.adchsm.me/slidebars/usage.php
(function($) {
  $(document).ready(function() {
    $.slidebars();
  });
}) (jQuery);

//Sticky //Usage: https://github.com/garand/sticky
$(document).ready(function(){
  $("#sticker").sticky({topSpacing:0});
});


//BxSlider //Usage: http://bxslider.com/options
$('.bxslider').bxSlider({
  speed: 1000,
  mode: 'fade'
});

//Google Fonts
WebFontConfig = {
    google: { families: [ 'Open+Sans:400italic,700italic,700,300,400:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();