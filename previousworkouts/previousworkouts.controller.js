(function() {
  'use strict';

  angular
    .module('app')
    .controller('PreviousWorkoutsController', PreviousWorkoutsController);

  PreviousWorkoutsController.$inject = ['$scope', 'authService', '$http', '$state'];

  function PreviousWorkoutsController($scope, authService, $http, $state) {

    $http.get($scope.url + "/getPreviousWorkouts?socialId=" + $scope.socialId).then(function successCallback(response) {
        $scope.previousData = response.data;
        console.dir(response.data);
      },
      function errorCallback(response) {
        console.log("Error getting users exercises " + JSON.stringify(response));
      });

    $scope.repeatWorkout = function(workoutData) {
      console.dir(workoutData);
      $http.post($scope.url + "/repeatPreviousWorkouts", {
        "workoutId": workoutData[0].workoutId,
        "userId": $scope.socialId
      }).then(function successCallback(response) {
          console.log("Routine Complete");
          $state.go('home');
        },
        function errorCallback(response) {
          console.log("Error saving set details " + JSON.stringify(response));
        });
    };

  }

}());