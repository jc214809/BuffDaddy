angular.module('sample.exercise', [
    'auth0'
  ])
  .controller('ExerciseCtrl', function ExerciseController($scope, auth, $http, $location, store) {
    $scope.exercise = {};
    $scope.exercise.image = "Joel";
    $scope.exercise.weight = false;
    $scope.exercise.reps = false;
    $scope.exercise.time = false;
    $scope.exercise.distance = false;
    $scope.exercise.calories = false;
    $scope.exercise.heartRate = false;

    $("#exerciseForm").submit(function(event) {
      //alert($("#exerciseForm").serializeObject());
      $http.post($scope.url + "/addExercise", $scope.exercise)
        .then(
          function successCallback(response) {
            //$scope.workoutIndicator = false;
            alert("Success " + JSON.stringify(response));
            $scope.exercise = {};
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
      //$scope.exerciseData = $("#exerciseForm").serializeAssoc();
    });

  });
