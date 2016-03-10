angular.module('sample.home', [
        'auth0'
    ])
    .controller('HomeCtrl', function HomeController($scope, auth, $http, $location, store) {

        $scope.auth = auth;

        console.log($scope.auth);

        $scope.callApi = function() {
            // Just call the API as you'd do using $http
            $http.get("http://192.168.1.140:7080/BuffDaddyAPI/test")
                .then(function(response) {
                    alert(JSON.stringify(response));
                });

            // $http.get('').then(function() {
            //     alert("We got the secured data successfully");
            // }, function(response) {
            //     if (response.status == 0) {
            //         alert("Please download the API seed so that you can call it.");
            //     } else {

            //     }
            // });


        }

        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path('/login');
        }

    });
