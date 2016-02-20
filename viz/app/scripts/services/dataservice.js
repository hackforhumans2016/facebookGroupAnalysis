'use strict';

/**
 * @ngdoc service
 * @name vizApp.dataService
 * @description
 * # dataService
 * Factory in the vizApp.
 */
angular.module('vizApp')
  .factory('dataService', function ($http) {

    return {
      getData: function () {
        return $http.get('data/content.json');
      }
    };
  });
