angular.module('sample.exerciseForm', [
    'auth0'
  ])
  .controller('ExerciseFormCtrl', function ExerciseFormController($scope, auth, $http, $location, store, exerciseservice) {

    $scope.resetForm = function() {
      $scope.exercise = {};
      $scope.exercise.image = null;
      $scope.exercise.weight = false;
      $scope.exercise.reps = false;
      $scope.exercise.time = false;
      $scope.exercise.distance = false;
      $scope.exercise.calories = false;
      $scope.exercise.heartRate = false;
      $scope.exercise.stairs = false;
      $scope.exercise.steps = false;
      $scope.exercise.level = false;
      $scope.exercise.incline = false;
      $scope.exercise.strokes = false;
      $scope.exercise.speed = false;
      $scope.exercise.socialId = $scope.auth.profile.identities[0].user_id;
    };
    $scope.resetForm();
    $scope.count = function() {
      if ($("input[type=checkbox]:checked").length === 0) {
        return false;
      } else {
        return true;
      }
    }

    $scope.maxSelect = function() {
      var limit = 4;
      $('input[type=checkbox]').on('change', function(evt) {
        if ($("input[type=checkbox]:checked").length > limit) {
          this.checked = false;
          alert("Only four attribute allowed per exercise");
        }
      });
    }

    if (exerciseservice.exercise.exerciseID) {
      $scope.exercise = exerciseservice.exercise;
    }
    if ($scope.exercise.exerciseID == null) {
      $scope.header = "Add";
      $scope.directions = "Here you can add Exercises that you would like to track throughout your workouts.";
      $scope.buttonText = "Add"
    } else {
      $scope.header = "Edit";
      $scope.directions = "Here you can edit exercises to track exactly what you want to be able to track.";
      $scope.buttonText = "Update"
    }
    $("#exerciseForm").submit(function(event) {
      if ($scope.exercise.exerciseID == null) {
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
              $location.path('/exercise');
            },
            function errorCallback(response) {
              alert("Error " + JSON.stringify(response));
            });
      }
    });

  });
