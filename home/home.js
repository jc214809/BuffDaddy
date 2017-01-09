angular.module('sample.home', ['auth0']).controller('HomeCtrl', function HomeController($scope, auth, $http, $location, store) {
  $scope.filters = {
    search: ''
  };
  $scope.filterBy = [];

  $http.get($scope.url + "/getUsersExercises?id=" + $scope.auth.profile.identities[0].user_id)
    .then(function successCallback(response) {
        $scope.exercises = response.data;
      },
      function errorCallback(response) {
        console.log("Error getting users exercises " + JSON.stringify(response));
      });
  $scope.auth = auth;
  $scope.workoutDetails = {
    "socialId": $scope.auth.profile.identities[0].user_id
  };
  $scope.workoutIndicator = false;
  $scope.checkForWorkout = function() {
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
          console.log("Error checking for workout" + JSON.stringify(response));
        });
  };
  $scope.checkForWorkout();
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
  };
  $scope.resetScroll = function() {
    $('#exerciseModal').scrollTop(0);
  };
  $scope.initModals = function() {
    $('.modal-trigger').leanModal(); // Initialize the modals
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
  };
  $scope.saveSetDetails = function(set) {
    $http.post($scope.url + "/saveSetDetails", set)
      .then(
        function successCallback(response) {
          console.log("Success");
        },
        function errorCallback(response) {
          console.log("Error saving set details " + JSON.stringify(response));
        });
  };
  $scope.deleteSet = function(set) {
    $http.post($scope.url + "/deleteSet", set)
      .then(
        function successCallback(response) {
          for (var i = 0; i < $scope.sets.length; i++) {
            if ($scope.sets[i].setId == set.setId) {
              $scope.sets.splice(i, 1);
            }
          }
          var count = 0;
          angular.forEach($scope.sets, function(eachSet) {
            if (eachSet.exerciseId == set.exerciseId) {
              count++;
            }
          });
          if (count == 0) {
            for (var i = 0; i < $scope.workoutExercises.length; i++) {
              if ($scope.workoutExercises[i].exerciseId == set.exerciseId) {
                var index = $scope.filterBy.indexOf($scope.workoutExercises[i].exerciseId);
                $scope.filterBy.splice(index, 1);
                $scope.workoutExercises.splice(i, 1);
              }
            }
          }
          console.log("Deleted");
        },
        function errorCallback(response) {
          console.log("Error deleting set " + JSON.stringify(response));
        });
  };
  $scope.checkForSets = function(newSetId, oldSetsArray) {
    for (var i = 0; i < oldSetsArray.length; i++) {
      if (oldSetsArray[i].setId == newSetId) {
        return true;
      }
    }
    return false;
  };
  $scope.checkForExercise = function(newExerciseId, oldExerciseArray) {
    for (var i = 0; i < oldExerciseArray.length; i++) {
      if (oldExerciseArray[i].exerciseId == newExerciseId) {
        return true;
      }
    }
    return false;
  };
  $scope.getSets = function(workoutID) {
    $http.get($scope.url + "/getSets?id=" + workoutID)
      .then(
        function successCallback(response) {
          if ($scope.sets == undefined || $scope.sets.length == undefined) {
            $scope.sets = response.data;
          } else {
            $scope.newSets = response.data;
            angular.forEach($scope.newSets, function(set) {
              if (!$scope.checkForSets(set.setId, $scope.sets, 'setId')) {
                $scope.sets.push(set);
              }
            });
          }
        },
        function errorCallback(response) {
          console.log("Error Getting sets " + JSON.stringify(response));
        });

  };
  $scope.getPreviousData = function(exercise) {
    // var data = {
    //   "exerciseId": exercise.exerciseId,
    //   "socialId": $scope.auth.profile.identities[0].user_id
    // }
    // $http.post($scope.url + "/getPreviousExerciseData", data).then(
    //   function successCallback(response) {
    //     $scope.previousData = response.data;
    //     if ($scope.previousData.length != 0) {
    //       $scope.lastWorkout = $scope.getPreviousExerciseDataPerWorkout($scope.previousData);
    //     } else {
    //       $scope.lastWorkout = [];
    //     }
    //     if ($scope.previousData.length != 0) {
    //       $scope.secondToLastWorkout = $scope.getPreviousExerciseDataPerWorkout($scope.previousData);
    //     } else {
    //       $scope.secondToLastWorkout = [];
    //     }
    //     if ($scope.previousData.length != 0) {
    //       $scope.ThirdToLastLastWorkout = $scope.getPreviousExerciseDataPerWorkout($scope.previousData);
    //     } else {
    //       $scope.ThirdToLastLastWorkout = [];
    //     }
    //     console.dir("1st array:" + $scope.lastWorkout)
    //     console.dir("2nd array:" + $scope.secondToLastWorkout)
    //     console.dir("3rd array:" + $scope.ThirdToLastLastWorkout)
    //   },
    //   function errorCallback(response) {
    //     alert("Error getting Previous Data " + JSON.stringify(response));
    //   });
  };
  $scope.getPreviousExerciseDataPerWorkout = function() {
    var array = [];
    var maxId = $scope.getMaxWorkoutId($scope.previousData);
    for (var i = $scope.previousData.length - 1; i >= 0; i--) {
      if ($scope.previousData[i].workoutId == maxId) {
        array.push($scope.previousData[i]);
        $scope.previousData.splice(i, 1);
      }
    }
    return array;
  };

  $scope.getMaxWorkoutId = function(array) {
    return Math.max.apply(Math, array.map(function(o) {
      return o.workoutId;
    }));
  };

  $scope.getExercise = function(workoutID) {
    $http.get($scope.url + "/getExercisesForWorkout?id=" + workoutID)
      .then(
        function successCallback(response) {
          if ($scope.workoutExercises == undefined || $scope.workoutExercises.length == undefined) {
            $scope.workoutExercises = response.data;
            angular.forEach($scope.workoutExercises, function(exercise) {
              $scope.filterBy.push(exercise.exerciseId);
              exercise.previousData = $scope.getPreviousData(exercise);
            });
          } else {
            $scope.newWorkoutExercises = response.data;
            angular.forEach($scope.newWorkoutExercises, function(exercise) {
              if (!$scope.checkForExercise(exercise.exerciseId, $scope.workoutExercises)) {
                $scope.workoutExercises.push(exercise);
                $scope.filterBy.push(exercise.exerciseId);
              }
            });
          }

        },
        function errorCallback(response) {
          console.log("Error getting Exercises " + JSON.stringify(response));
        });
    // 
  };

  $scope.endWorkout = function() {
    $http.post($scope.url + "/endWorkout", $scope.workoutDetails)
      .then(
        function successCallback(response) {
          $scope.workoutData = '';
          $scope.sets = {};
          $scope.workoutExercises = {};
          $scope.workoutIndicator = false;
        },
        function errorCallback(response) {
          console.log("Error Ending workout " + JSON.stringify(response));
        });
  };

  $scope.newWorkout = function() {
    $http.post($scope.url + "/newWorkout", $scope.workoutDetails)
      .then(
        function successCallback(response) {
          $scope.checkForWorkout();
        },
        function errorCallback(response) {
          console.log("Error starting workout " + JSON.stringify(response));
        });
  };

  $scope.addSet = function(exerciseId) {
    $scope.setDetails = {
      "workoutId": $scope.workoutData.workoutID,
      "exerciseId": exerciseId
    }

    $http.post($scope.url + "/addSet", $scope.setDetails)
      .then(
        function successCallback(response) {
          $scope.getExercise($scope.workoutData.workoutID);
          $scope.getSets($scope.workoutData.workoutID);
          $scope.filters.search = '';
          $('#exerciseModal').closeModal();
        },
        function errorCallback(response) {
          console.log("Error adding set" + JSON.stringify(response));
        });
  };

  $scope.logout = function() {
    auth.signout();
    store.remove('profile');
    store.remove('token');
    $location.path('/login');
  };

});
