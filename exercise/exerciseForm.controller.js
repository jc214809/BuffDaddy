(function() {
  'use strict';

  angular
    .module('app')
    .controller('ExerciseFormController', ExerciseFormController);

  ExerciseFormController.$inject = ['$scope', 'authService', '$state', '$http', 'exerciseservice'];

  function ExerciseFormController($scope, authService, $state, $http, exerciseservice) {
    $scope.exercise = {};
    $scope.resetForm = function() {
      $scope.exercise = {
        image: null,
        weight: false,
        reps: false,
        time: false,
        distance: false,
        calories: false,
        heartRate: false,
        stairs: false,
        steps: false,
        level: false,
        incline: false,
        strokes: false,
        speed: false,
        socialId: $scope.socialId,
        arms: false,
        back: false,
        chest: false,
        core: false,
        legs: false,
        shoulders: false,
        cardio:false
      };
    };
    $scope.count = function() {
      if ($("input[type=checkbox]:checked").length === 0) {
        return false;
      } else {
        return true;
      }
    }

    if (exerciseservice.exercise.exerciseId) {
      $scope.exercise = exerciseservice.exercise;
    }
    if ($scope.exercise.exerciseId == null) {
      $scope.header = "Add";
      $scope.directions = "Here you can add Exercises that you would like to track throughout your workouts.";
      $scope.buttonText = "Add"
      $scope.resetForm();
    } else {
      $scope.header = "Edit";
      $scope.directions = "Here you can edit exercises to track exactly what you want to be able to track.";
      $scope.buttonText = "Update"
    }
    $("#exerciseForm").submit(function(event) {
      console.log(JSON.stringify($scope.exercise));
      if ($scope.exercise.exerciseId == null) {
        $http.post($scope.url + "/addExercise", $scope.exercise)
          .then(
            function successCallback(response) {
              alert("Success " + JSON.stringify(response));
              $scope.resetForm();
            },
            function errorCallback(response) {
              alert("Error " + JSON.stringify(response));
            });
      } else {
        $http.post($scope.url + "/editExercise", $scope.exercise)
          .then(
            function successCallback(response) {
              alert("Updated " + JSON.stringify(response));
              $state.go('exercise');
            },
            function errorCallback(response) {
              alert("Error " + JSON.stringify(response));
            });
      }
    });
  }

}());
