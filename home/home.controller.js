(function() {

  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'authService', '$http', '$location', 'previousDataService', '$filter'];

  function HomeController($scope, authService, $http, $location, previousDataService, $filter) {
    $scope.authService = authService;
    $scope.filters = {
      search: ''
    };
    $scope.filterBy = [];
    $scope.workoutIndicator = false;
    $scope.disabled = true;

    authService.getProfileDeferred().then(function(profile) {
      $scope.profile = profile;
      $scope.socialId = $scope.profile.identities[0].user_id;

      $scope.checkForWorkout();
      $http.get($scope.url + "/getUsersExercises?id=" + $scope.socialId)
        .then(function successCallback(response) {
            $scope.exercises = response.data;
          },
          function errorCallback(response) {
            console.log("Error getting users exercises " + JSON.stringify(response));
          });
    });

    $scope.checkForWorkout = function() {
      $http.get($scope.url + "/workoutInProgress?id=" + $scope.socialId)
        .then(
          function successCallback(response) {
            $scope.workoutData = response.data;
            if ($scope.workoutData != '') {
              $scope.workoutIndicator = true;
              $scope.getExercise(response.data.workoutId);
              $scope.getSets(response.data.workoutId);
            }
            //$scope.disabled = false;
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
            alert("That shit failed to save!")
          });
    };
    $scope.removeSetFromArray = function(set) {
      for (var i = 0; i < $scope.sets.length; i++) {
        if ($scope.sets[i].setId == set.setId) {
          $scope.sets.splice(i, 1);
          break;
        }
      }
    }

    $scope.countSetsOfExercise = function(set) {
      return $filter('filter')($scope.sets, { exerciseId: set.exerciseId }, true).length;
    }
    $scope.removeFromSortTable = function(set) {
      var index = $scope.workoutExercises.indexOf($filter('filter')($scope.workoutExercises, { exerciseId: set.exerciseId }, true)[0]);
      //Delete Workout Exercise
      $http.post($scope.url + "/deleteWorkoutExercise", {
        "workoutId": $scope.workoutData.workoutId,
        "exerciseId": set.exerciseId
      }).then(function successCallback(response) {
        $scope.filterBy.splice(index, 1);
        $scope.workoutExercises.splice(index, 1);
        console.log("Deleted UserExercise");
      }, function errorCallback(response) {
        console.log("Failed to Deleted UserExercise");
      });
    }

    $scope.deleteSet = function() {
      var set = $scope.setDeleteData;
      $http.post($scope.url + "/deleteSet", set).then(function successCallback(response) {
          $scope.removeSetFromArray(set);
          if ($scope.countSetsOfExercise(set) == 0) {
            $scope.removeFromSortTable(set);
          }
        },
        function errorCallback(response) {
          console.log("Error deleting set " + JSON.stringify(response));
        });
    };
    $scope.checkForSets = function(setId) {
      if ($filter('filter')($scope.sets, { setId: setId })[0]) {
        return true;
      }
      return false;
    };
    $scope.checkForExercise = function(exerciseId) {
      if ($filter('filter')($scope.workoutExercises, { exerciseId: exerciseId }, true)[0]) {
        return true;
      }
      return false;
    };

    $scope.getSets = function(workoutId) {
      $http.get($scope.url + "/getSets?id=" + workoutId).then(function successCallback(response) {
          if ($scope.sets == undefined || $scope.sets.length == undefined) {
            $scope.sets = response.data;
          } else {
            $scope.newSets = response.data;
            angular.forEach($scope.newSets, function(set) {
              if (!$scope.checkForSets(set.setId)) {
                $scope.sets.push(set);
              }
            });
          }
          $scope.disabled = false;
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
        .then(function successCallback(response) {
            if ($scope.workoutExercises == undefined || $scope.workoutExercises.length == undefined) {
              $scope.workoutExercises = response.data;
              angular.forEach($scope.workoutExercises, function(exercise) {
                $scope.filterBy.push(exercise.exerciseId);
              });
              //$scope.getWorkoutTitle();
            } else {
              $scope.newWorkoutExercises = response.data;
              //console.log($scope.newWorkoutExercises);
              angular.forEach($scope.newWorkoutExercises, function(exercise) {
                if (!$scope.checkForExercise(exercise.exerciseId)) {
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
    $scope.filter = function(arr) {
      return arr.sort(function(a, b) {
        return a < b;
      });
    }

    function compare(a, b) {
      if (a.count < b.count)
        return -1;
      if (a.count > b.count)
        return 1;
      return 0;
    }

    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    $scope.getWorkoutTitle = function() {
      $scope.groups = [{
        name: "arms",
        count: $scope.workoutExercises.filter(function(x) { return x.arms; }).length
      }, {
        name: "back",
        count: $scope.workoutExercises.filter(function(x) { return x.back; }).length
      }, {
        name: "cardio",
        count: $scope.workoutExercises.filter(function(x) { return x.cardio; }).length
      }, {
        name: "chest",
        count: $scope.workoutExercises.filter(function(x) { return x.chest; }).length
      }, {
        name: "core",
        count: $scope.workoutExercises.filter(function(x) { return x.core; }).length
      }, {
        name: "legs",
        count: $scope.workoutExercises.filter(function(x) { return x.legs; }).length
      }, {
        name: "shoulders",
        count: $scope.workoutExercises.filter(function(x) { return x.shoulders; }).length
      }];
      $scope.groups.sort(compare).reverse();

      $scope.groups = $scope.groups.filter(function(value, index, array) {
        return (value.count > 0);
      });

      $scope.groups = $scope.removeCardio($scope.groups);

      $scope.workoutTitle = "";
      for (var i = 0; i < $scope.groups.length; i++) {
        $scope.workoutTitle += capitalizeFirstLetter($scope.groups[i].name);
        if (i < $scope.groups.length - 1) {
          $scope.workoutTitle += ", ";
        }
      }
      $scope.workoutTitle = $scope.workoutTitle.replace(/,(?=[^,]+$)/, ' &');
    }
    $scope.removeCardio = function(groups) {
      var totalExercisesCount = $scope.workoutExercises.filter(function(x) { return x.arms; }).length + $scope.workoutExercises.filter(function(x) { return x.back; }).length + $scope.workoutExercises.filter(function(x) { return x.cardio; }).length + $scope.workoutExercises.filter(function(x) { return x.chest; }).length + $scope.workoutExercises.filter(function(x) { return x.core; }).length + $scope.workoutExercises.filter(function(x) { return x.legs; }).length + $scope.workoutExercises.filter(function(x) { return x.shoulders; }).length;
      var cardioExercisesCount = $scope.workoutExercises.filter(function(x) { return x.cardio; }).length
      if (.25 > (cardioExercisesCount / totalExercisesCount) && cardioExercisesCount != 0) {
        var i = groups.map(function(e) { return e.name; }).indexOf('cardio');
        groups.splice(i, 1);
      }
      return groups;
    }
    $scope.endWorkout = function() {
      $scope.disabled = true;
      $http.post($scope.url + "/endWorkout", { workoutId: $scope.workoutData.workoutId, userId: $scope.socialId, workoutTitle: $scope.workoutTitle })
        .then(function successCallback(response) {
            $scope.workoutData = '';
            $scope.sets = [];
            $scope.workoutTitle = null;
            $scope.workoutExercises = [];
            $scope.filterBy = [];
            $scope.workoutIndicator = false;
            $scope.disabled = false;
          },
          function errorCallback(response) {
            console.log("Error Ending workout " + JSON.stringify(response));
          });
    };

    $scope.newWorkout = function() {
      $scope.disabled = true;
      $http.post($scope.url + "/newWorkout", {
        "socialId": $scope.socialId
      }).then(function successCallback(response) {
          $scope.checkForWorkout();
          $scope.disabled = false;
        },
        function errorCallback(response) {
          console.log("Error starting workout " + JSON.stringify(response));
        });
    };

    $scope.addSet = function(exerciseId) {
      if (!$scope.checkForExercise(exerciseId, $scope.workoutExercises)) {
        $http.post($scope.url + "/addWorkoutExercise", {
          "workoutId": $scope.workoutData.workoutId,
          "exerciseId": exerciseId
        }).then(function successCallback(response) {
            console.log("Added UserExercise");
            $scope.createSet(exerciseId);
          },
          function errorCallback(response) {
            console.log("Failed to Add UserExercise");
          });
      } else {
        $scope.createSet(exerciseId);
      }
    };


    $scope.createSet = function(exerciseId) {
      $http.post($scope.url + "/addSet", {
        "workoutId": $scope.workoutData.workoutId,
        "exerciseId": exerciseId
      }).then(function successCallback(response) {
        $scope.getExercise($scope.workoutData.workoutId);
        $scope.getSets($scope.workoutData.workoutId);
        $scope.filters.search = '';
        $('#exerciseModal').modal('close');
      }, function errorCallback(response) {
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