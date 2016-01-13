function isMobile(){
  return (
    (navigator.userAgent.match(/Android/i)) ||
    (navigator.userAgent.match(/webOS/i)) ||
    (navigator.userAgent.match(/iPhone/i)) ||
    (navigator.userAgent.match(/iPod/i)) ||
    (navigator.userAgent.match(/iPad/i)) ||
    (navigator.userAgent.match(/BlackBerry/))
  );
}

//Height
//Doing this just for window detection
jQuery.browser = {};
    (function () {
        jQuery.browser.msie = false;
        jQuery.browser.version = 0;
        if (navigator.userAgent.match(/MSIE ([0-9]+)\./)) {
            jQuery.browser.msie = true;
            jQuery.browser.version = RegExp.$1;
        }
    })();

//SET VIEW PORT HEIGHT Functionally
function getBrowserHeight() {
  if ($.browser.msie) {
      return document.compatMode == "CSS1Compat" ? document.documentElement.clientHeight :
               document.body.clientHeight;
  } else {
      return self.innerHeight;
  }
}

function getBrowserWidth() {
  if ($.browser.msie) {
    return document.compatMode == "CSS1Compat" ? document.documentElement.clientWidth :
             document.body.clientWidth;
  } else {
    return self.innerWidth;
  }
}


