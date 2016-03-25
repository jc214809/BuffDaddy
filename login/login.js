angular.module('sample.login', [
        'auth0'
    ])
    .controller('LoginCtrl', function HomeController($scope, auth, $http, $location, store) {

        $scope.login = function() {
            auth.signin({}, function(profile, token) {
                    console.log("Profile: " + JSON.stringify(profile))
                    store.set('profile', profile);
                    store.set('token', token);

                    $scope.userDetails = {
                        email: profile.email,
                        given_name: profile.given_name,
                        family_name: profile.family_name,
                        gender: profile.gender,
                        id: profile.identities[0].user_id
                    };
                    //$http.post("http://75.118.135.179:7080/BuffDaddyAPI/register", $scope.userDetails)
                    //$http.post("http://192.168.1.140:7080/BuffDaddyAPI/register", JSON.stringify($scope.userDetails))
                    $http.post("http://localhost/BuffDaddyAPI/register", JSON.stringify($scope.userDetails))
                        .then(
                            function successCallback(response) {
                                alert("Success");
                                alert(response);
                            },
                            function errorCallback(response) {
                                alert("Error " + JSON.stringify(response));
                            });
                    $location.path("/");

                },
                function(error) {
                    console.log("There was an error logging in", error);
                });
        }

    });
