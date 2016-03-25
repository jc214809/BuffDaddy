angular.module('sample.home', [
        'auth0'
    ])
    .controller('HomeCtrl', function HomeController($scope, auth, $http, $location, store) {

        $scope.auth = auth;
        $scope.workoutDetails = {
            "id": $scope.auth.profile.identities[0].user_id
        };
        $scope.workoutIndicator = false;

        $http.get("http://localhost/BuffDaddyAPI/workoutInProgress?id=" + $scope.workoutDetails.id)
            .then(
                function successCallback(response) {
                    $scope.workoutData = response.data;
                    if ($scope.workoutData == '') {
                        $scope.workoutIndicator = false;
                    } else {
                        $scope.workoutIndicator = true;
                    }
                },
                function errorCallback(response) {
                    alert("Error " + JSON.stringify(response));
                });

        $scope.callApi = function() {
            //$http.get("http://192.168.1.140:7080/BuffDaddyAPI/workoutInProgress?id=" + $scope.workoutDetails.id)
            $http.post("http://localhost/BuffDaddyAPI/endWorkout", $scope.workoutDetails)
                .then(
                    function successCallback(response) {
                        $scope.workoutIndicator = false;
                    },
                    function errorCallback(response) {
                        alert("Error " + JSON.stringify(response));
                    });
        }
        $scope.newWorkout = function() {
            //$http.post("http://192.168.1.140:7080/BuffDaddyAPI/newWorkout", $scope.workoutDetails)
            $http.post("http://localhost/BuffDaddyAPI/newWorkout", $scope.workoutDetails)
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
