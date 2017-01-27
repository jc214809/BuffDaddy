(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$scope','authService', '$state'];

  function LoginController($scope, authService, $state) {

    $scope.authService = authService;
    $state.go('home');
  }

}());
