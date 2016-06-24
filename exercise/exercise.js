angular.module('sample.exercise', [
    'auth0'
  ])
  .controller('ExerciseCtrl', function ExerciseController($scope, auth, $http, $location, store) {
    $http.get($scope.url + "/getAllExercises")
      .then(function successCallback(response) {
          $scope.exercises = response.data;
        },
        function errorCallback(response) {
          alert("Error " + JSON.stringify(response));
        });
  });
