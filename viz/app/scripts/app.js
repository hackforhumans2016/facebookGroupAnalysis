'use strict';

/**
 * @ngdoc overview
 * @name vizApp
 * @description
 * # vizApp
 *
 * Main module of the application.
 */
angular
  .module('vizApp', [
    'rzModule'
  ]).factory('util', function() {

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
  }).constant('colWidth', 50)
  .factory('dataService', function($http, $q, $log, colWidth) {

    //var name = "syrianHomeBerlin";



    var getPosts = function(data, nPage) {
      //var data = [];
      /*var likesList = [];
      var commentsList = [];
      var sharesList = [];
      var i = 0;*/

      console.log(nPage);

      return data;
      /* for (var element in data) {

          var post = resp.data[element];

          //console.log(post.id + ": " +post.message);
          if ("full_picture" in post) {
            data.push({
              "id": post.id,
              "message": (("message" in post) ? post.message : ""),
              "likes": (("likes" in post) ? post.likes.summary.total_count : 0),
              "shares": (("shares" in post) ? post.shares.count : 0),
              "comments": (("comments" in post) ? post.comments.summary.total_count : 0),

              "full_picture": post.full_picture,
              "date": post.create_time
            });

            likesList.push(("likes" in post) ? post.likes.summary.total_count : 0);
            sharesList.push(("shares" in post) ? post.shares.count : 0);
            commentsList.push(("comments" in post) ? post.comments.summary.total_count : 0);
            //console.log(data[data.length-1])	;
          }
        }
        var lSD = math.std(likesList);
        var cSD = math.std(commentsList);
        var sSD = math.std(sharesList);

        //console.log([lSD,cSD,sSD])
        var weights = [0.64, 0.52, 0.56];

        var normVal = math.max(likesList) / lSD * weights[0] +
          math.max(commentsList) / cSD * weights[1] +
          math.max(sharesList) / sSD * weights[2]


        for (element in data) {
          data[element]["score"] = (weights[0] * data[element]["likes"] / lSD +
            weights[1] * data[element]["comments"] / cSD +
            weights[2] * data[element]["shares"] / sSD) / normVal;
        }


        // if we want more elements, call it again
        if (i < nPage) {
          var nextPage = resp.paging.next;
          console.log(nextPage);
          i++;
          $.getJSON(nextPage, getPosts)

        }*/
    };

    var make_fb_call = function(group_id, nPage) {
      var deferred = $q.defer();
      var url = "https://graph.facebook.com/" + group_id + "/feed?fields=id,message,full_picture,shares,created_time,likes.limit(0).summary(true),comments.limit(0).summary(true)&access_token=508385019364150|OsA40FhehthBOWMySxJCyBCcsdU";

      $http.get(url, function(data) {
        var posts = getPosts(data, nPage);
        deferred.resolve(posts);
      }, function(error) {
        deferred.reject(error);
      });

      return deferred.promise;
    };

    //make_fb_call("542747389189895", 7)
    //console.log(data);

    return {
      getOnlineData: function() {
        return make_fb_call("542747389189895", 7);
      },
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
  })
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
  }).directive('masonry', function($timeout, $document, $log, colWidth, $compile, util) {
    return {
      template: '<div class="grid"></div>',
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      link: function postLink(scope) {

        var grid;

        /*global $*/
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
