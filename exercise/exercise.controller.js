(function() {
  'use strict';

  angular
    .module('app')
    .controller('ExerciseController', ExerciseController);

  ExerciseController.$inject = ['$scope', 'authService', '$state', '$http', 'exerciseservice'];

  function ExerciseController($scope, authService, $state, $http, exerciseservice) {
    $scope.filterAllExercises = [];
    $scope.filterByUsersExercises = [];
    $scope.currentPage = 0;
    $scope.pageSize = 8;
    $scope.exercisesSort = '';

    $scope.getMyExercises = function() {
      return $filter('filter')($scope.usersExercises, $scope.exercisesSort)
    }

    $scope.numberOfPages = function() {
      return Math.ceil($scope.usersExercises.length / $scope.pageSize);
    }

    $http.get($scope.url + "/getAllExercises")
      .then(function successCallback(response) {
          $scope.exercises = response.data;
          angular.forEach($scope.exercises, function(exercise) {
            $scope.filterAllExercises.push(exercise.exerciseId);
          });
        },
        function errorCallback(response) {
          alert("Error " + JSON.stringify(response));
        });
    $http.get($scope.url + "/getUsersExercises?id=" + $scope.socialId)
      .then(function successCallback(response) {
          $scope.usersExercises = response.data;
          angular.forEach($scope.usersExercises, function(exercise) {
            $scope.filterByUsersExercises.push(exercise.exerciseId);
          });
        },
        function errorCallback(response) {
          alert("Error " + JSON.stringify(response));
        });
    $scope.toggle = function(id) {
      $("#details-" + id).toggle("slow");
    };
    $scope.deleteUserExercise = function(exerciseId) {
      $http.post($scope.url + "/deleteUsersExercise", {
          "socialId": $scope.socialId,
          "exerciseId": exerciseId
        })
        .then(function successCallback(response) {
            for (var i = 0; i < $scope.usersExercises.length; i++) {
              if ($scope.usersExercises[i].exerciseId == exerciseId) {
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
      $http.post($scope.url + "/addExerciseToUser", {
        "socialId": $scope.socialId,
        "exerciseId": exerciseId
      }).then(function successCallback(response) {
          $scope.filterByUsersExercises.push(exerciseId);
          for (var i = 0; i < $scope.exercises.length; i++) {
            if ($scope.exercises[i].exerciseId == exerciseId) {
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