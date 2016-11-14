
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .config(function($routeProvider){
      $routeProvider.when("/", {
        templateUrl: "/partials/views/main.html"
      })
      .otherwise('/');
    });
  
})();

