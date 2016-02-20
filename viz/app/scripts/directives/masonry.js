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
      templateUrl: 'scripts/directives/masonry.html',
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      link: function postLink(scope, element) {

        var grid;

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

            if(nodes) {
              grid.masonry('remove', nodes);
              grid.masonry();
            }
          }
        });

        $document.ready(function() {
          $timeout(function() {
            //var elem = document.querySelector('.grid');
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

            /*grid.imagesLoaded().progress(function() {
              grid.masonry({
                // options
                itemSelector: '.grid-item',
                columnWidth: 200
              });
              $log.log('Constructing');
            });*/

          });
        });
      }
    };
  });