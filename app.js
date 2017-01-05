var myDiv;
console.origLog = console.log;
console.log = function(x) {
if(!myDiv) myDiv = document.getElementById('div');
if(myDiv) myDiv.innerHTML = x;
else console.origLog("can not determine myDiv");
}    
angular.module('sample', [
        'auth0',
        'ngRoute',
        'sample.home',
        'sample.login',
        'sample.exerciseForm',
        'sample.exercise',
        'angular-storage',
        'angular-jwt',
        'ui.materialize',
        'ngInputModified'
      ])
      .config(function myAppConfig($routeProvider, authProvider, $httpProvider, $locationProvider,
        jwtInterceptorProvider, jwtOptionsProvider) {
        jwtOptionsProvider.config({
          whiteListedDomains: ['localhost', 'jc214809.github.io']
        });
        $routeProvider
          .when('/', {
            controller: 'HomeCtrl',
            templateUrl: 'home/home.html',
            pageTitle: 'Homepage',
            requiresLogin: true
          })
          .when('/login', {
            controller: 'LoginCtrl',
            templateUrl: 'login/login.html',
            pageTitle: 'Login'
          })
          .when('/one', {
            controller: 'LoginCtrl',
            templateUrl: 'one.html',
            pageTitle: 'One'
          })
          .when('/exercise', {
            controller: 'ExerciseCtrl',
            templateUrl: 'exercise/exercise.html',
            pageTitle: 'Exercise',
            requiresLogin: true
          })
          .when('/exerciseForm', {
            controller: 'ExerciseFormCtrl',
            templateUrl: 'exercise/exerciseForm.html',
            pageTitle: 'Exercise',
            requiresLogin: true
          });


        authProvider.init({
          domain: AUTH0_DOMAIN,
          clientID: AUTH0_CLIENT_ID,
          loginUrl: '/login'
        });

        // jwtInterceptorProvider.tokenGetter = function(store) {
        //     return store.get('token');
        // }


        // Add a simple interceptor that will fetch all requests and add the jwt token to its authorization header.
        // NOTE: in case you are calling APIs which expect a token signed with a different secret, you might
        // want to check the delegation-token example
        $httpProvider.interceptors.push('jwtInterceptor');
      }).run(function($rootScope, auth, store, jwtHelper, $location) {
        $rootScope.$on('$locationChangeStart', function() {
          if (!auth.isAuthenticated) {
            var token = store.get('token');
            if (token) {
              if (!jwtHelper.isTokenExpired(token)) {
                auth.authenticate(store.get('profile'), token);
              } else {
                $location.path('/login');
              }
            }
          }

        });
      }).service('exerciseservice', function() {
        this.exercise = {};
      })
      .controller('AppCtrl', function AppCtrl($scope, $location, auth, store) {
        $scope.auth = auth;

        //$scope.url = 'http://localhost:8089/BuffDaddyAPI';
        $scope.url = 'http://75.118.135.179:7080/BuffDaddyAPI';

        $scope.toggle = function(id) {
          $("#details-" + id).toggle("slow");
        };

        $scope.logout = function() {
          auth.signout();
          store.remove('profile');
          store.remove('token');
          $location.path('/login');
          $('.button-collapse').sideNav('hide');
        }

        $scope.close = function() {
          $('.button-collapse').sideNav('hide');
        }

        $scope.$on('$routeChangeSuccess', function(e, nextRoute) {
          if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
            $scope.pageTitle = nextRoute.$$route.pageTitle + ' | BuffDaddy';
          }
        });
      }).filter('inArray', function($filter) {
        return function(list, arrayFilter, element) {
          if (arrayFilter) {
            return $filter("filter")(list, function(listItem) {
              return arrayFilter.indexOf(listItem[element]) != -1;
            });
          }
        };
      }).filter('notInArray', function($filter) {
        return function(list, arrayFilter, element) {
          if (arrayFilter) {
            return $filter("filter")(list, function(listItem) {
              return arrayFilter.indexOf(listItem[element]) == -1;
            });
          }
        };
      });
