
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .directive('mainNavigation', function() {
      return {
        restrict: 'E',
        templateUrl: '/partials/global-content/main-navigation.html'
      }
    });
  
})();

