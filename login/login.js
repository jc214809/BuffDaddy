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
                    }

                    $http.post("http://localhost/BuffDaddyAPI/register", JSON.stringify($scope.userDetails))
                        .then(
                            function successCallback(response) {
                                alert("Success");
                            },
                            function errorCallback(response) {
                                alert("Error");
                            });

                    $location.path("/");
                },
                function(error) {
                    console.log("There was an error logging in", error);
                });
        }

    });