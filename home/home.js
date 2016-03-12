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
        }

        $scope.logout = function() {
            auth.signout();
            store.remove('profile');
            store.remove('token');
            $location.path('/login');
        }

    });
