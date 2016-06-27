angular.module('sample.exerciseForm', [
    'auth0'
  ])
  .controller('ExerciseFormCtrl', function ExerciseFormController($scope, auth, $http, $location, store) {
    $scope.exercise = {};
    $scope.exercise.image = null;
    $scope.exercise.weight = false;
    $scope.exercise.reps = false;
    $scope.exercise.time = false;
    $scope.exercise.distance = false;
    $scope.exercise.calories = false;
    $scope.exercise.heartRate = false;
    $scope.exercise.socialId = $scope.auth.profile.identities[0].user_id;

    $("#exerciseForm").submit(function(event) {
      $http.post($scope.url + "/addExercise", $scope.exercise)
        .then(
          function successCallback(response) {
            alert("Success " + JSON.stringify(response));
            $scope.exercise = {};
            $scope.exercise.image = null;
            $scope.exercise.weight = false;
            $scope.exercise.reps = false;
            $scope.exercise.time = false;
            $scope.exercise.distance = false;
            $scope.exercise.calories = false;
            $scope.exercise.heartRate = false;
            $scope.exercise.socialId = $scope.auth.profile.identities[0].user_id;
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    });

  });
