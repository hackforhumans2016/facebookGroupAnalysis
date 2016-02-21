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

    $scope.data = [];

    $scope.datasets = [{
      id: 0,
      label: 'Syria Home Berlin',
      path: 'data/syrianHomeBerlin_100.json'
    }, {
      id: 1,
      label: 'Syrien in Deutschland',
      path: 'data/syrienindeutschland_100.json'
    }, {
      id: 2,
      label: 'Deutschland in Arabisch',
      path: 'data/deutschlandInArabisch_100.json'
    }];

    $scope.selectedDataset = $scope.datasets[0];

    $scope.slider = {
      min: 0.3,
      max: 0.9,
      options: {
        floor: 0,
        ceil: 1,
        precision: 3,
        step: 0.001
      }
    };

    var filterMinMaxSlider = function(object) {
      return object.score < $scope.slider.max && object.score > $scope.slider.min;
    };

    $scope.getData = function(path) {
      $log.log(path);
      dataService.getData(path).then(function(data) {
        allData = data;
        $log.log($scope.data);
        var filteredData = allData.filter(filterMinMaxSlider);
        $scope.data = filteredData;
        $log.log($scope.data);
      }, function(error) {
        $log.error(error);
      });
    };

    $scope.getData($scope.selectedDataset.path);

    $scope.$on("slideEnded", function() {
      $log.log('slide ended');
      if (allData.length > 0) {
        $scope.$apply(function() {
          $scope.data = allData.filter(filterMinMaxSlider);
          $log.log('Scope data length: ', $scope.data.length);
        });
      }
    });
  });
