'use strict';

/**
 * @ngdoc function
 * @name vizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vizApp
 */
angular.module('vizApp')
  .controller('MainCtrl', function ($scope, dataService) {

    dataService.getData().success(function(data){
      $scope.data = data;
    })
  });
