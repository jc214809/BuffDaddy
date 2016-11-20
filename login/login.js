angular.module('sample.login', [
    'auth0'
  ])
  .controller('LoginCtrl', function HomeController($scope, auth, $http, $location, store) {
    // if ($scope.auth.isAuthenticated) {
    //   $location.path("/");
    // }
    alert("0");
    $scope.login = function() {
      alert("1");
      auth.signin({}, function(profile, token) {
              alert("2");
          console.log("Profile: " + JSON.stringify(profile))
          //store.set('profile', profile);
          //store.set('token', token);

          $scope.userDetails = {
            emailAddress: profile.email,
            firstName: profile.given_name,
            lastName: profile.family_name,
            gender: profile.gender,
            socialId: profile.identities[0].user_id
          };
          $http.post($scope.url + "/register", JSON.stringify($scope.userDetails))
            .then(
              function successCallback(response) {
                              alert("3");
                console.log("Success");
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
