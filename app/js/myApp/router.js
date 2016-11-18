
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .config(function($routeProvider){
      $routeProvider.when('/', {
        templateUrl: '/partials/page-content/home.html'
      })
      .otherwise({
           redirectTo: '/'
      });
    });
  
})();

