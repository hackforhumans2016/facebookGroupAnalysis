'use strict';

/**
 * @ngdoc function
 * @name vizApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vizApp
 */
angular.module('vizApp')
  .controller('MainCtrl', function($scope, dataService, $log) {

    var allData = [];

    $scope.slider = {
      min: 0,
      max: 0.1,
      options: {
        floor: 0,
        ceil: 32,
        precision: 2,
        step: 0.001
      }
    };

    var filterMinMaxSlider = function(object) {
      return object.score <  $scope.slider.max && object.score > $scope.slider.min;
    };

    dataService.getData().then(function(data) {
      allData = data;
      $scope.data = allData.filter(filterMinMaxSlider);
      $log.log('Scope data length: ', $scope.data.length);
    });

    $scope.$on("slideEnded", function() {
      $log.log('slide ended');
      if(allData.length > 0) {
        $scope.$apply(function() {
          $scope.data = allData.filter(filterMinMaxSlider);
          $log.log('Scope data length: ', $scope.data.length);
        });
      }
    });
  });
