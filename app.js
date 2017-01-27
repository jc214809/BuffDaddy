(function() {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'ui.materialize'])
    .config(config)
    .controller('AppCtrl', function AppCtrl($scope, authService) {
      //var vm = this;
      $scope.authService = authService;

      authService.getProfileDeferred().then(function(profile) {
        $scope.profile = profile;
        $scope.socialId = $scope.profile.identities[0].user_id;
      });

      //$scope.url = 'http://localhost:8089/BuffDaddyAPI';
      $scope.url = 'http://75.118.135.179:7080/BuffDaddyAPI';

      $scope.close = function() {
        $('.button-collapse').sideNav('hide');
      }

      // $scope.$on('$routeChangeSuccess', function(e, nextRoute) {
      //   if (nextRoute.$$route && angular.isDefined(nextRoute.$$route.pageTitle)) {
      //     $scope.pageTitle = nextRoute.$$route.pageTitle + ' | BuffDaddy';
      //   }
      // });
    })
    .service("previousDataService", function($http, $q) {
      this.getPreviousData = function(url, exerciseId, userId) {
        var deferred = $q.defer();
        $http.get(url + "/getPreviousExerciseData?exerciseId=" + exerciseId + "&socialId=" + userId).then(function(data) {
          deferred.resolve(data);
        }, function(data) {
          deferred.reject(data);
        });
        return deferred.promise;
      }
    }).filter('inArray', function($filter) {
      return function(list, arrayFilter, element) {
        if (arrayFilter) {
          return $filter("filter")(list, function(listItem) {
            return arrayFilter.indexOf(listItem[element]) != -1;
          });
        }
      };
    }).service('exerciseservice', function() {
      this.exercise = {};
    }).directive('repeatDone', function() {
      return function(scope, element, attrs) {
        if (scope.$last) { // all are rendered
          scope.$eval(attrs.repeatDone);
        }
      }
    });

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'jwtOptionsProvider'];

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'home/home.html',
        //controllerAs: 'vm',
        data: {
          requiresLogin: true,
          pageTitle: 'Home'
        }
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'login/login.html',
        //controllerAs: 'vm',
        data: {
          requiresLogin: false,
          pageTitle: 'Login'
        }
      }).state('exercise', {
        url: '/exercise',
        controller: 'ExerciseController',
        templateUrl: 'exercise/exercise.html',
        //controllerAs: 'vm',
        data: {
          requiresLogin: true,
          pageTitle: 'Exercise'
        }
      }).state('exerciseForm', {
        url: '/exerciseForm',
        controller: 'ExerciseFormController',
        templateUrl: 'exercise/exerciseForm.html',
        //controllerAs: 'vm',
        data: {
          requiresLogin: true,
          pageTitle: 'Exercise'
        }
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      loginUrl: 'login'
    });

    $urlRouterProvider.otherwise('/login');


    // Configuration for angular-jwt
    jwtOptionsProvider.config({
      tokenGetter: ['options', function(options) {
        if (options && options.url.substr(options.url.length - 5) == '.html') {
          return null;
        }
        return localStorage.getItem('id_token');
      }],
      whiteListedDomains: ['localhost'],
      unauthenticatedRedirector: ['$state', function($state) {
        $state.go('login');
      }]
    });

  }

})();
