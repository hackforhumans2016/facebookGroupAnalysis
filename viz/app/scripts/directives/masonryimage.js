'use strict';

/**
 * @ngdoc directive
 * @name vizApp.directive:masonryImage
 * @description
 * # masonryImage
 */
angular.module('vizApp')
  .directive('masonryImage', function ($log) {
    return {
      template: '<img ng-src="{{img}}"/>',
      restrict: 'E',
      scope: {
        img: '='
      },
      link: function postLink(scope, element, attrs) {
        element.on('load', function() {
          console.log('test');
            //$log.log(element.width + 'x' + element.height);
        });

      }
    };
  });
