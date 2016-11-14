
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .directive('myContent', function() {
      return {
        restrict: 'E',
        templateUrl: '/partials/content/my-content.html'
      }
    });
  
})();

