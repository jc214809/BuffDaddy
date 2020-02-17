(function() {
  'use strict';

  angular
    .module('app')
    .controller('PreviousWorkoutsController', PreviousWorkoutsController);

  PreviousWorkoutsController.$inject = ['$scope', 'authService', '$http', '$state'];

  function PreviousWorkoutsController($scope, authService, $http, $state) {

    $http.get($scope.url + "/getAllPreviousWorkoutSets?socialId=" + $scope.socialId).then(function successCallback(response) {
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
          console.log("Routine Added Successfully");
          $state.go('home');
        },
        function errorCallback(response) {
          console.log("Error saving set details " + JSON.stringify(response));
        });
    };

    var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.getDate = function(date) {
      console.log(date);
      $scope.d = new Date(date.replace(/ /g,"T"));
      console.log("Test Date: " + " -- " + $scope.d + "Month Number: " + $scope.d.getMonth() + " -- " +"Month name: " + month_names_short[$scope.d.getMonth()] + " -- " +"Month day: " + $scope.d.getDate() + " -- " +"Year Number: " + $scope.d.getFullYear() + " -- " +"Whole Thing: " + month_names_short[$scope.d.getMonth()] + " " + $scope.d.getDate() + ", " + $scope.d.getFullYear());
      return month_names_short[$scope.d.getMonth()] + " " + $scope.d.getDate() + ", " + $scope.d.getFullYear();
    };

  }

}());