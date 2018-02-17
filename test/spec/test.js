(function() {
  'use strict';

  beforeEach(function() {
    // loads the app module
    module('app');
  });

  beforeEach(function() {
    inject(function(_$controller_) {
      // inject removes the underscores and finds the $controller Provider
      $controller = _$controller_;
      //HomeController = $controller('HomeController', {});
    });
  });

  // beforeEach(inject(function($rootScope) {
  //   //new a $scope
  //   $scope = $rootScope.$new();
  //   var controller = $controller('HomeController', { $scope: $scope });
  // }));
  // Suite
  describe('Testing a HomeController', function() {
    var $controller;
    var controller = null;
    var $scope = null;
    // Setup for all tests

    it('exists', function() {
      $scope = $rootScope.$new();
      var controller = $controller('HomeController', { $scope: $scope });
      expect(controller).toBeDefined();
      expect(controller).not.toBeNull();
    });

    it('Workout Indicator defualts to false', function() {
      $scope = $rootScope.$new();
      var controller = $controller('HomeController', { $scope: $scope });
      console.log($scope.workoutIndicator);
      expect($scope.workoutIndicator).toEqual(false);
    });

    it('Width of inputs is correct', function() {
      $scope = $rootScope.$new();
      var controller = $controller('HomeController', { $scope: $scope });
      var joel = controller.setWidth(1);
      console.log(joel);
      expect(joel).toEqual("88.2%");
      //expect(setWidth(2)).toEqual(false);
      //expect(setWidth(3)).toEqual(false);
      //expect(setWidth(4)).toEqual(false);
      //expect(setWidth(5)).toEqual(false);
    });

    // ... Other tests here ...
  });
})();