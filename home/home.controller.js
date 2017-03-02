Skip to content
This repository
Search
Pull requests
Issues
Gist
@jc214809
Sign out
Unwatch 1
Star 0
Fork 0 jc214809 / BuffDaddy
Code Issues 6 Pull requests 0 Projects 1 Wiki Pulse Graphs Settings
Branch: gh - pages Find file Copy pathBuffDaddy / home / home.controller.js
fe5e843 11 days ago
@jc214809 jc214809 Add Ability to add a workout Title
1 contributor
RawBlameHistory
422 lines(397 sloc) 13.6 KB(function() {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'authService', '$http', '$location', 'previousDataService'];

  function HomeController($scope, authService, $http, $location, previousDataService) {
    $scope.authService = authService;
    $scope.filters = {
      search: ''
    };
    $scope.filterBy = [];
    $scope.workoutIndicator = null;
    //$scope.workoutTitle = null;

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
              $scope.getExercise(response.data.workoutId);
              $scope.getSets(response.data.workoutId);
            }
          },
          function errorCallback(response) {
            console.log("Error checking for workout" + JSON.stringify(response));
          });
    };

    $scope.inputWidth = function(exerciseId) {
      var count = 0
      for (var i = 0; i < $scope.workoutExercises.length; i++) {
        if (exerciseId == $scope.workoutExercises[i].exerciseId) {
          if ($scope.workoutExercises[i].calories) {
            count++
          }
          if ($scope.workoutExercises[i].distance) {
            count++
          }
          if ($scope.workoutExercises[i].heartRate) {
            count++
          }
          if ($scope.workoutExercises[i].reps) {
            count++
          }
          if ($scope.workoutExercises[i].time) {
            count++
          }
          if ($scope.workoutExercises[i].weight) {
            count++
          }
          if ($scope.workoutExercises[i].stairs) {
            count++
          }
          if ($scope.workoutExercises[i].steps) {
            count++
          }
          if ($scope.workoutExercises[i].level) {
            count++
          }
          if ($scope.workoutExercises[i].incline) {
            count++
          }
          if ($scope.workoutExercises[i].strokes) {
            count++
          }
          if ($scope.workoutExercises[i].speed) {
            count++
          }
        }
        $scope.setWidth(count);
      }
    };

    $scope.resetScroll = function() {
      $('#exerciseModal').scrollTop(0);
    };

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
                  //Delete Workout Exercise
                  $scope.setDetails = {
                    "workoutId": $scope.workoutData.workoutId,
                    "exerciseId": $scope.workoutExercises[i].exerciseId
                  }
                  $http.post($scope.url + "/deleteWorkoutExercise", $scope.setDetails)
                    .then(
                      function successCallback(response) {
                        console.log("Deleted UserExercise");
                      },
                      function errorCallback(response) {
                        console.log("Failed to Deleted UserExercise");
                      });
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
    $scope.getSets = function(workoutId) {
      $http.get($scope.url + "/getSets?id=" + workoutId)
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

    $scope.getExercise = function(workoutId) {
      $http.get($scope.url + "/getExercisesForWorkout?id=" + workoutId)
        .then(
          function successCallback(response) {
            if ($scope.workoutExercises == undefined || $scope.workoutExercises.length == undefined) {
              $scope.workoutExercises = response.data;
              angular.forEach($scope.workoutExercises, function(exercise) {
                $scope.filterBy.push(exercise.exerciseId);
              });
              //$scope.getWorkoutTitle();
            } else {
              $scope.newWorkoutExercises = response.data;
              console.log($scope.newWorkoutExercises);
              angular.forEach($scope.newWorkoutExercises, function(exercise) {
                if (!$scope.checkForExercise(exercise.exerciseId, $scope.workoutExercises)) {

                  $scope.workoutExercises.push(exercise);
                  $scope.filterBy.push(exercise.exerciseId);
                }
              });
              //$scope.getWorkoutTitle();
            }
          },
          function errorCallback(response) {
            console.log("Error getting Exercises " + JSON.stringify(response));
          });
    };
    $scope.filter = function(arr) {
      return arr.sort(function(a, b) {
        return a < b;
      });
    }

    $scope.getWorkoutTitle = function() {
      $scope.groups = [
        {
          name: "arms"
          count: $scope.workoutExercises.filter(function(x){ return x.arms; }).length
        },
        {
          name: "back"
          count: $scope.workoutExercises.filter(function(x){ return x.back; }).length
        },
        {
          name: "cardio"
          count: $scope.workoutExercises.filter(function(x){ return x.cardio; }).length
        },
        {
          name: "chest"
          count: $scope.workoutExercises.filter(function(x){ return x.chest; }).length
        },
        {
          name: "core"
          count: $scope.workoutExercises.filter(function(x){ return x.core; }).length
        },
        {
          name: "legs"
          count: $scope.workoutExercises.filter(function(x){ return x.legs; }).length
        },
        {
          name: "shoulders"
          count: $scope.workoutExercises.filter(function(x){ return x.shoulders; }).length
        }
      ];
      $scope.groups.sort(function(a, b) {
        return parseFloat(a.count) - parseFloat(b.count);
      });

      $scope.groups.filter(function (el) {
        return el.count > 0
      });

      console.dir($scope.groups);
      // for (var i = $scope.groups.length - 1; i >= 0; i--) {
      //   $scope.groups[i]
      // }
      // var Joel = [];
      // Joel.push($scope.groups);
      // var items = Joel;
      // for (var i = 0; i < items.length; ++i) {
      //   console.log("Item #" + i);
      //   for (var name in items[i]) {
      //     console.log(name + "=====" + items[i][name]);
      //   }
      //   // return items[i].sort(function(a, b) {
      //   //   console.dir(a);
      //   //   console.dir(b);
      //   //   return a < b;
      //   // })
      // }
      //console.dir(items);
      //console.log($scope.filter($scope.groups));
    }
    $scope.endWorkout = function() {
      $http.post($scope.url + "/endWorkout", { workoutId: $scope.workoutData.workoutId, userId: $scope.socialId, workoutTitle: $scope.workoutTitle })
        .then(
          function successCallback(response) {
            $scope.workoutData = '';
            $scope.sets = [];
            $scope.workoutTitle = null;
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
        "workoutId": $scope.workoutData.workoutId,
        "exerciseId": exerciseId
      }
      if (!$scope.checkForExercise(exerciseId, $scope.workoutExercises)) {
        $http.post($scope.url + "/addWorkoutExercise", $scope.setDetails)
          .then(
            function successCallback(response) {
              console.log("Added UserExercise");
            },
            function errorCallback(response) {
              console.log("Failed to Add UserExercise");
            });
      }
      $http.post($scope.url + "/addSet", $scope.setDetails)
        .then(
          function successCallback(response) {
            $scope.getExercise($scope.workoutData.workoutId);
            $scope.getSets($scope.workoutData.workoutId);
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
        if ($scope.exercises[i].exerciseId == exerciseId) {
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
  }

}());
