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
      getData: function(path) {
        var deferred = $q.defer();
        $http.get(path).success(function(data) {
          data = data.map(function(elem) {
            var baseSize = colWidth;

            //secret sauce
            var resizeFactor = Math.ceil(Math.log(elem.score + 0.001) / 2 + 4);

            elem.style = {
              width: resizeFactor * baseSize,
              height: resizeFactor * baseSize
            };

            elem.size = resizeFactor;

            if (elem.full_picture_x < elem.full_picture_y) {
              elem.img = {
                style: {
                  width: elem.style.width
                }
              };
            } else {
              elem.img = {
                style: {
                  height: elem.style.height
                }
              };
            }

            return elem;
          });

          deferred.resolve(data);
        }).error(function(error) {
          deferred.reject(error);
        });
        return deferred.promise;
      }
    };
  });
