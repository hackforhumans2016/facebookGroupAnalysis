'use strict';

/**
 * @ngdoc overview
 * @name vizApp
 * @description
 * # vizApp
 *
 * Main module of the application.
 */
angular
  .module('vizApp', [
    'ngAnimate',
    'ngResource',
    'ngRoute',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
