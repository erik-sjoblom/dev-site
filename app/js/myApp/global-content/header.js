
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .directive('myHeader', function() {
      return {
        restrict: 'E',
        templateUrl: '/partials/global/header.html'
      }
    });
  
})();

