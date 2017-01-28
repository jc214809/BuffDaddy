(function() {

  'use strict';

  angular
    .module('app', ['auth0.lock', 'angular-jwt', 'ui.router', 'ui.materialize'])
    .config(config)
    .controller('AppCtrl', function AppCtrl($scope, authService) {
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
    });

  config.$inject = ['$stateProvider', 'lockProvider', '$urlRouterProvider', 'jwtOptionsProvider'];

  function config($stateProvider, lockProvider, $urlRouterProvider, jwtOptionsProvider) {

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeController',
        templateUrl: 'home/home.html',
        data: {
          requiresLogin: true,
          pageTitle: 'Home'
        }
      })
      .state('login', {
        url: '/login',
        controller: 'LoginController',
        templateUrl: 'login/login.html',
        data: {
          requiresLogin: false,
          pageTitle: 'Login'
        }
      }).state('exercise', {
        url: '/exercise',
        controller: 'ExerciseController',
        templateUrl: 'exercise/exercise.html',
        data: {
          requiresLogin: true,
          pageTitle: 'Exercise'
        }
      }).state('exerciseForm', {
        url: '/exerciseForm',
        controller: 'ExerciseFormController',
        templateUrl: 'exercise/exerciseForm.html',
        data: {
          requiresLogin: true,
          pageTitle: 'Exercise'
        }
      });

    lockProvider.init({
      clientID: AUTH0_CLIENT_ID,
      domain: AUTH0_DOMAIN,
      loginState: '/login',
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
