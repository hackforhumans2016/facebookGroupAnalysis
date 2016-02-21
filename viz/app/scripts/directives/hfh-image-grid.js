'use strict';

/**
 * @ngdoc directive
 * @name vizApp.directive:hfhImageGrid
 * @description
 * # hfhImageGrid
 */
angular.module('vizApp')
  .directive('hfhImageGrid', function () {
    //"<img src=\"" + object.full_picture + "\"/>"
    return {
      template: '<div class="hfh-grid-container"><div ng-repeat="imageObject in data" ng-class="{\'hfh-col-1\':imageObject.size === 1, \'hfh-col-2\':imageObject.size === 2, \'hfh-col-3\':imageObject.size === 3, \'hfh-col-4\':imageObject.size === 4, \'hfh-col-5\':imageObject.size === 5}"><img ng-src="{{imageObject.full_picture}}"></div>',
      restrict: 'E',
      scope: {
        data: '='
      },
      link: function postLink(scope, element) {
      }
    };
  });
