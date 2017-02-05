(function () {
  'use strict';

  angular
    .module('app')
    .controller('PreviousWorkoutsController', PreviousWorkoutsController);

  PreviousWorkoutsController.$inject = ['$scope','authService','$http'];

  function PreviousWorkoutsController($scope, authService, $http) {

    $http.get($scope.url + "/getPreviousWorkouts?socialId=" + $scope.socialId).then(function successCallback(response) {
          //$scope.previousData = response.data;
          $scope.previousData = $filter('orderBy')(response.data, '-workoutId');

        },
        function errorCallback(response) {
          console.log("Error getting users exercises " + JSON.stringify(response));
        });
  }

}());
