
(function() {
  'use strict';
  
  angular
    .module('myApp')
    .directive('navExpander', function() {
      return {
        restrict: 'C',
        link: function(scope, elem, attrs) {
          jQuery(function($) {
            $('.site-header .nav-expander')
              .on('mouseenter', function() {
                $('.header-navigation').addClass('visible');
              })
              .on('touchstart click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                $('.header-navigation')
                  .toggleClass('nav-open')
                  .removeClass('visible');
              });
            $('.site-header')
              .on('mouseleave', function() {
                $('.header-navigation').removeClass('visible');
              });
            $('.site-header .mobile-nav-close-btn')
              .on('touchstart click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                $('.header-navigation').removeClass('nav-open');
              });
            $('.site-header .nav-container a')
              .on('touchstart click', function(e) {
                e.stopPropagation();
                e.preventDefault();
                $('.header-navigation').removeClass('nav-open');
                if(e.target.href) {
                  window.location = e.target.href;
                }
                return false;
              });
            $(window).on('resize', function() {
              $('.header-navigation').removeClass('nav-open visible');
            });
          });
        }
      }
    });
  
})();

