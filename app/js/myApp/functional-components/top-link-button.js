
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .directive('topLinkButton', function() {
      return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
          jQuery(window).scroll(function() {
            if(jQuery(this).scrollTop() > 300) {
              jQuery(".top-link-button").addClass("mt-is-visible");
            } else {
              jQuery(".top-link-button").addClass("mt-fade-out")
              jQuery(".top-link-button").removeClass("mt-is-visible mt-fade-out");
            }
          });
          jQuery(".top-link-button").on("click", function(e) {
            e.preventDefault();
            jQuery("body,html").animate({
              scrollTop: 0
            }, 700);
          });
        }
      }
    });
  
})();

