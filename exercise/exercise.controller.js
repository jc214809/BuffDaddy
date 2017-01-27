(function() {
  'use strict';

  angular
    .module('app')
    .controller('ExerciseController', ExerciseController);

  ExerciseController.$inject = ['$scope', 'authService', '$state', '$http', 'exerciseservice'];

  function ExerciseController($scope, authService, $state, $http, exerciseservice) {
    $scope.filterAllExercises = [];
    $scope.filterByUsersExercises = [];
 
    $http.get($scope.url + "/getAllExercises")
      .then(function successCallback(response) {
          $scope.exercises = response.data;
          angular.forEach($scope.exercises, function(exercise) {
            $scope.filterAllExercises.push(exercise.exerciseID);
          });
        },
        function errorCallback(response) {
          alert("Error " + JSON.stringify(response));
        });
    $http.get($scope.url + "/getUsersExercises?id=" + $scope.socialId)
      .then(function successCallback(response) {
          $scope.usersExercises = response.data;
          angular.forEach($scope.usersExercises, function(exercise) {
            $scope.filterByUsersExercises.push(exercise.exerciseID);
          });
        },
        function errorCallback(response) {
          alert("Error " + JSON.stringify(response));
        });
    $scope.toggle = function(id) {
      $("#details-" + id).toggle("slow");
    };
    $scope.deleteUserExercise = function(exerciseId) {
      $scope.exercise = {
        "socialId": $scope.socialId,
        "exerciseID": exerciseId
      };

      $http.post($scope.url + "/deleteUsersExercise", $scope.exercise)
        .then(function successCallback(response) {
            for (var i = 0; i < $scope.usersExercises.length; i++) {
              if ($scope.usersExercises[i].exerciseID == exerciseId) {
                var index = $scope.filterByUsersExercises.indexOf($scope.usersExercises[i].exerciseId);
                $scope.filterByUsersExercises.splice(index, 1);
                $scope.usersExercises.splice(i, 1);
              }
            }
            alert("Removed " + JSON.stringify(response));
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    };
    $scope.goToForm = function() {
      exerciseservice.exercise = {};
      $state.go('exerciseForm');
    }

    $scope.editExercise = function(exercise) {
      exerciseservice.exercise = exercise;
      $state.go('exerciseForm');
    }
    $scope.addUserExercise = function(exerciseId) {
      $scope.exercise = {
        "socialId": $scope.user,
        "exerciseID": exerciseId
      };

      $http.post($scope.url + "/addExerciseToUser", $scope.exercise)
        .then(function successCallback(response) {
            $scope.filterByUsersExercises.push(exerciseId);
            for (var i = 0; i < $scope.exercises.length; i++) {
              if ($scope.exercises[i].exerciseID == exerciseId) {
                $scope.usersExercises.push($scope.exercises[i]);
              }
            }
            alert("Added " + JSON.stringify(response));
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    };
  }

}());
