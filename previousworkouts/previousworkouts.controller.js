(function () {
  'use strict';

  angular
    .module('app')
    .controller('PreviousWorkoutsController', PreviousWorkoutsController);

  PreviousWorkoutsController.$inject = ['$scope','authService'];

  function PreviousWorkoutsController($scope, authService) {

    $scope.authService = authService;
    $state.go('home');
  }

}());
