'use strict';

/**
 * @ngdoc directive
 * @name vizApp.directive:masonry
 * @description
 * # masonry
 */
angular.module('vizApp')
  .directive('masonry', function($timeout, $document, $log, colWidth, $compile, util) {
    return {
      template: '<div class="grid"></div>',
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      link: function postLink(scope, element) {

        var grid;

        $(document).ready(function() {
          $(document).tooltip({
            items: "[data-message]",
            content: function() {
              var element = $(this);
              if (element.is("[data-message]")) {
                var message = element.data('message');
                return message;
              }
            }
          });
        });

        scope.$watchCollection('data', function(newCollection, oldCollection) {

          if (grid && newCollection) {

            var appendObjects = util.onlyInA(newCollection, oldCollection);
            var removeObjects = util.onlyInA(oldCollection, newCollection);

            appendObjects.forEach(function(object) {
              var elem = $("<div class=\"grid-item\"></div>");
              elem.attr('id', object.id);
              elem.css(object.style);
              var img = $("<img src=\"" + object.full_picture + "\"/>");
              img.css(object.img.style);
              elem.append(img);
              elem.attr('data-message', object.message);
              grid.masonry()
                .append(elem)
                .masonry('appended', elem)
                .masonry();
            });

            var ids = removeObjects.map(function(object) {
              return object.id;
            });

            var nodes = $.map(ids, function(i) {
              return document.getElementById(i);
            });

            if (nodes) {
              grid.masonry('remove', nodes);
              grid.masonry();
            }
          }
        });

        $document.ready(function() {
          $timeout(function() {
            grid = $('.grid').masonry({
              // options
              itemSelector: '.grid-item',
              columnWidth: colWidth
            });

            var onLayout = function() {
              console.log('layout done');
            };
            // bind event listener
            grid.on('layoutComplete', onLayout);
          });
        });
      }
    };
  });
