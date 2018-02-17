describe('Controller Unit test', function() {

  var controller;

  var scope;

  beforeEach(module('app'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('HomeController', {
      '$scope': scope
    });
  }));

  describe('Get the controller', function() {
    it('Width of inputs is correct', function() {
      scope.setWidth(1);
      expect(scope.size).toEqual("88.2%");
      scope.setWidth(2);
      expect(scope.size).toEqual("44.125%");
      scope.setWidth(3);
      expect(scope.size).toEqual("29.41%");
      scope.setWidth(4);
      expect(scope.size).toEqual("22.25%");
      scope.setWidth(0);
      expect(scope.size).toEqual("13%");
      scope.setWidth(99);
      expect(scope.size).toEqual("13%");

    });
  });
});