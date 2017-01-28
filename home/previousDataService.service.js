(function() {
  'use strict';

  angular.module('app').service("previousDataService", function($http, $q) {
    this.getPreviousData = function(url, exerciseId, userId) {
      var deferred = $q.defer();
      $http.get(url + "/getPreviousExerciseData?exerciseId=" + exerciseId + "&socialId=" + userId).then(function(data) {
        deferred.resolve(data);
      }, function(data) {
        deferred.reject(data);
      });
      return deferred.promise;
    }
  });

}());
