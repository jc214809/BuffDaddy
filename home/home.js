angular.module('sample.home', [
    'auth0'
  ])
  .controller('HomeCtrl', function HomeController($scope, auth, $http, $location, store) {
    $scope.filters = {
      search: ''
    };

    $http.get($scope.url + "/getAllExercises")
      .then(function successCallback(response) {
          $scope.exercises = response.data;
        },
        function errorCallback(response) {
          alert("Error " + JSON.stringify(response));
        });
    $scope.auth = auth;
    $scope.workoutDetails = {
      "socialId": $scope.auth.profile.identities[0].user_id
    };
    $scope.workoutIndicator = false;

    $http.get($scope.url + "/workoutInProgress?id=" + $scope.workoutDetails.socialId)
      .then(
        function successCallback(response) {
          $scope.workoutData = response.data;
          if ($scope.workoutData == '') {
            $scope.workoutIndicator = false;
          } else {
            $scope.workoutIndicator = true;
            $scope.getExercise(response.data.workoutID);
            $scope.getSets(response.data.workoutID);
          }
        },
        function errorCallback(response) {
          alert("Error " + JSON.stringify(response));
        });
    $scope.inputWidth = function(exerciseId) {
      var count = 0
      for (var i = 0; i < $scope.workoutExercises.length; i++) {
        if (exerciseId == $scope.workoutExercises[i].exerciseId) {
          if ($scope.workoutExercises[i].calories == "1") {
            count++
          }
          if ($scope.workoutExercises[i].distance == "1") {
            count++
          }
          if ($scope.workoutExercises[i].heartRate == "1") {
            count++
          }
          if ($scope.workoutExercises[i].reps == "1") {
            count++
          }
          if ($scope.workoutExercises[i].time == "1") {
            count++
          }
          if ($scope.workoutExercises[i].weight == "1") {
            count++
          }
        }
        $scope.setWidth(count);
      }
    }
    $scope.setWidth = function(count) {
      switch (count) {
        case 6:
          $scope.size = "13.5%";
          break;
        case 5:
          $scope.size = "16.2%";
          break;
        case 4:
          $scope.size = "20.25%";
          break;
        case 3:
          $scope.size = "27%";
          break;
        case 2:
          $scope.size = "40.5%";
          break;
        case 1:
          $scope.size = "81%";
          break;
        default:
          $scope.size = "13%";
      }
    }
    $scope.saveSetDetails = function(set) {
      $http.post($scope.url + "/saveSetDetails", set)
        .then(
          function successCallback(response) {
            alert("Success");
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    }
    $scope.deleteSet = function(set) {
      $http.post($scope.url + "/deleteSet", set)
        .then(
          function successCallback(response) {
            alert("Deleted");
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    }
    $scope.getSets = function(workoutID) {
      $http.get($scope.url + "/getSets?id=" + workoutID)
        .then(
          function successCallback(response) {
            $scope.sets = response.data;
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    }
    $scope.getExercise = function(workoutID) {
      $http.get($scope.url + "/getExercisesForWorkout?id=" + workoutID)
        .then(
          function successCallback(response) {
            $scope.workoutExercises = response.data;
            //alert("YAY " + JSON.stringify(response));
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    }
    $scope.endWorkout = function() {
      $http.post($scope.url + "/endWorkout", $scope.workoutDetails)
        .then(
          function successCallback(response) {
            $scope.workoutIndicator = false;
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    }
    $scope.newWorkout = function() {
      $http.post($scope.url + "/newWorkout", $scope.workoutDetails)
        .then(
          function successCallback(response) {
            $scope.workoutIndicator = true;
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    }

    $scope.addSet = function(exerciseId) {
      $scope.setDetails = {
        "workoutId": $scope.workoutData.workoutID,
        "exerciseId": exerciseId
      }

      $http.post($scope.url + "/addSet", $scope.setDetails)
        .then(
          function successCallback(response) {
            alert(JSON.stringify(response));
            $scope.getExercise($scope.workoutData.workoutID);
            $scope.getSets($scope.workoutData.workoutID);
            $scope.filters.search = '';
            $('#exerciseModal').closeModal();
          },
          function errorCallback(response) {
            alert("Error " + JSON.stringify(response));
          });
    }

    $scope.logout = function() {
      auth.signout();
      store.remove('profile');
      store.remove('token');
      $location.path('/login');
    }

  });
