
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .directive('topLinkButton', function() {
      return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
          jQuery(function($) {
            $(window).scroll(function() {
              if($(this).scrollTop() > 300) {
                $('.top-link-button').addClass('top-link-visible');
              } else {
                $('.top-link-button').removeClass('top-link-visible');
              }
            });
            $('.top-link-button').on('touchstart click', function(e) {
              e.stopPropagation();
              e.preventDefault();
              $('body, html').animate({
                scrollTop: 0
              }, 700);
            });
          });
        }
      }
    });
  
})();

