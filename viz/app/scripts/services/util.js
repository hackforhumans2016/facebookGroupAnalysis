'use strict';

/**
 * @ngdoc service
 * @name vizApp.util
 * @description
 * # util
 * Factory in the vizApp.
 */
angular.module('vizApp')
  .factory('util', function() {

    return {
      onlyInA: function(a, b) {
        var c = [];

        if (a && b) {
          for (var i = 0; i < a.length; i++) {
            var objA = a[i];
            var isInB = false;
            for (var j = 0; j < b.length; j++) {
              var objB = b[j];
              if (objA.id === objB.id) {
                isInB = true;
                break;
              }
            }
            if (!isInB) {
              c.push(objA);
            }
          }
        }

        return c;
      }
    };
  });
