'use strict';

/**
 * @ngdoc service
 * @name vizApp.dataService
 * @description
 * # dataService
 * Factory in the vizApp.
 */
angular.module('vizApp')
  .factory('dataService', function($http, $q, $log, colWidth) {

    return {
      getData: function() {
        var deferred = $q.defer();
        $http.get('data/content_100.json').success(function(data) {
          data = data.map(function(elem) {
            var baseSize = colWidth;

            //secret sauce
            var resizeFactor = Math.ceil(Math.log(elem.score+0.001)/2+4);

            elem.style = {
              width: resizeFactor * baseSize,
              height: resizeFactor * baseSize
            };

            if (elem.full_picture_x < elem.full_picture_y) {
              elem.img = {style: {width: elem.style.width}};
            } else {
              elem.img = {style: {height: elem.style.height}};
            }

            return elem;
          });

          deferred.resolve(data);
        });
        return deferred.promise;
      }
    };
  });
