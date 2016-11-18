
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .directive('myFooter', function() {
      return {
        restrict: 'E',
        templateUrl: '/partials/global-content/footer.html',
      }
    });
  
})();

