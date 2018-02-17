describe('Exercise Controller', function() {

  var controller;

  var scope;

  beforeEach(module('app'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('ExerciseController', {
      '$scope': scope
    });
  }));

  describe('Test the Exercise Controller', function() {});
});