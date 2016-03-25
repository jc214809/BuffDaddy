angular.module('sample.home', [
        'auth0'
    ])
    .controller('HomeCtrl', function HomeController($scope, auth, $http, $location, store) {

        $scope.auth = auth;
        $scope.workoutDetails = {
            "id": $scope.auth.profile.identities[0].user_id
        };
        $scope.workoutIndicator = false;

        $http.get($scope.url + "/workoutInProgress?id=" + $scope.workoutDetails.id)
            .then(
                function successCallback(response) {
                    $scope.workoutData = response.data;
                    if ($scope.workoutData == '') {
                        $scope.workoutIndicator = false;
                    } else {
                        $scope.workoutIndicator = true;
                    }
                    console.log(JSON.stringify($scope.workoutData));
                },
                function errorCallback(response) {
                    alert("Error " + JSON.stringify(response));
                });

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
            $http.post($scope.url + "/BuffDaddyAPI/newWorkout", $scope.workoutDetails)
                .then(
                    function successCallback(response) {
                        $scope.workoutIndicator = true;
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
