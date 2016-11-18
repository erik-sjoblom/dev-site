
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .directive('myFooter', function() {
      return {
        restrict: 'E',
        templateUrl: '/partials/global-content/footer.html',
        link: function(scope, elem, attrs) {
            function checkContentHeight() {
              jQuery(function($) {
                var contentHeight = $('.main-content').outerHeight() + $('.site-footer').outerHeight();
                if(window.innerHeight >= contentHeight) {
                  $('.site-footer').addClass('fixed');
                } else {
                  $('.site-footer').removeClass('fixed');
                }
              });
            }
            jQuery(function($) {
              checkContentHeight();
              $(window).on('resize', checkContentHeight);
            });
            scope.$watch(function() { 
              return jQuery(document).height();
            }, function onHeightChange(newValue, oldValue) {
              checkContentHeight();
            });
            scope.theDate = new Date().toJSON().slice(0,10);
        }
      }
    });
  
})();

