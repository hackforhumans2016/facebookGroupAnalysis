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

    //var name = "syrianHomeBerlin";



    var getPosts = function(data, nPage) {
      //var data = [];
      var likesList = [];
      var commentsList = [];
      var sharesList = [];
      var i = 0;

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
  });
