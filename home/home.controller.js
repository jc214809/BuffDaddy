(function() {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'authService', '$http', '$location', 'previousDataService'];

  function HomeController($scope, authService, $http, $location, previousDataService) {
    $scope.authService = authService;

    authService.getProfileDeferred().then(function(profile) {
      $scope.profile = profile;
      $scope.socialId = $scope.profile.identities[0].user_id;

      $scope.checkForWorkout();
      $http.get($scope.url + "/getUsersExercises?id=" + $scope.socialId).then(function successCallback(response) {
          $scope.exercises = response.data;
        },
        function errorCallback(response) {
          console.log("Error getting users exercises " + JSON.stringify(response));
        });
    });

    $scope.filters = {
      search: ''
    };
    $scope.filterBy = [];
    $scope.workoutIndicator = null;

    $scope.workoutDetails = {
      "socialId": $scope.socialId
    };

    $scope.checkForWorkout = function() {
      $http.get($scope.url + "/workoutInProgress?id=" + $scope.socialId)
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

    // $http.get($scope.url + "/getUsersExercises?id=" + $scope.socialId)
    //   .then(function successCallback(response) {
    //       $scope.exercises = response.data;
    //     },
    //     function errorCallback(response) {
    //       console.log("Error getting users exercises " + JSON.stringify(response));
    //     });

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
          if ($scope.workoutExercises[i].stairs == "1") {
            count++
          }
          if ($scope.workoutExercises[i].steps == "1") {
            count++
          }
          if ($scope.workoutExercises[i].level == "1") {
            count++
          }
          if ($scope.workoutExercises[i].incline == "1") {
            count++
          }
          if ($scope.workoutExercises[i].strokes == "1") {
            count++
          }
          if ($scope.workoutExercises[i].speed == "1") {
            count++
          }
        }
        $scope.setWidth(count);
      }
    };
    $scope.resetScroll = function() {
      $('#exerciseModal').scrollTop(0);
    };
    // $scope.getIndexAndTime = function(exerciseId, index) {
    //   $scope.workoutExercises
    //   for (var i = 0; i < $scope.workoutExercises.length; i++) {
    //     if (true) {
    //       if ($scope.workoutExercises[i].sortNumber || $scope.workoutExercises[i].time) {
    //         $scope.workoutExercises[i].sortNumber = index;
    //         var d = new Date();
    //         $scope.workoutExercises[i].time = d.toJSON();
    //       }
    //     }
    //   }
    // };
    $scope.toggleExerciseDescription = function() {
      if ($(".exerciseDescription").offsetHeight < 75) {
        if ($(".exerciseDescription").css("height") == "75px") {
          $('.exerciseDescription').css('height', 'auto');
        } else {
          $('.exerciseDescription').css('height', '75px');
        }
      }
    };
    $scope.functionThatReturnsStyle = function() {
      var element = document.getElementById('exerciseDescription');
      var style1 = "height: 75px";
      var style2 = "height: auto";
      if (element.offsetHeight > 75) {
        return style1;
      } else {
        return style2;
      }

    }
    $scope.initModals = function() {
      $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
        },
        complete: function() {
            //e.preventDefault();
          } // Callback for Modal close
      });
    }
    $scope.setWidth = function(count) {
      switch (count) {
        // case 6:
        //   $scope.size = "13.5%";
        //   break;
        // case 5:
        //   $scope.size = "16.2%";
        //   break;
        case 4:
          $scope.size = "22.25%";
          break;
        case 3:
          $scope.size = "29.41%";
          break;
        case 2:
          $scope.size = "44.125%";
          break;
        case 1:
          $scope.size = "88.2%";
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
    $scope.deleteSet = function() {
      var set = $scope.setDeleteData;
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
    $scope.getPreviousData = function(exerciseId) {
      var promise = previousDataService.getPreviousData($scope.url, exerciseId, $scope.socialId)
      promise.then(function(data) {
        return data;
      });
    };

    $scope.getExercise = function(workoutID) {
      $http.get($scope.url + "/getExercisesForWorkout?id=" + workoutID)
        .then(
          function successCallback(response) {
            if ($scope.workoutExercises == undefined || $scope.workoutExercises.length == undefined) {
              $scope.workoutExercises = response.data;
              angular.forEach($scope.workoutExercises, function(exercise) {
                $scope.filterBy.push(exercise.exerciseId);
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
    };

    $scope.endWorkout = function() {
      $http.post($scope.url + "/endWorkout", $scope.workoutDetails)
        .then(
          function successCallback(response) {
            $scope.workoutData = '';
            $scope.sets = [];
            $scope.workoutExercises = [];
            $scope.filterBy = [];
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
            $('#exerciseModal').modal('close');
          },
          function errorCallback(response) {
            console.log("Error adding set" + JSON.stringify(response));
          });
    };

    $scope.getModalDetails = function(exerciseId) {
      $scope.previousData = null;
      for (var i = $scope.exercises.length - 1; i >= 0; i--) {
        if ($scope.exercises[i].exerciseID == exerciseId) {
          $scope.modalExerciseDetails = $scope.exercises[i];
          break;
        }
      }
      var promise = previousDataService.getPreviousData($scope.url, exerciseId, $scope.socialId)
      promise.then(function(data) {
        $scope.previousData = data.data;
      });
    };

    $scope.storeDeleteData = function(set) {
      $scope.setDeleteData = set;
    };

    // $scope.logout = function() {
    //   auth.signout();
    //   store.remove('profile');
    //   store.remove('token');
    //   $location.path('/login');
    // };

  }

}());
