    (function() {
      'use strict';

      angular.module('app').directive('repeatDone', function() {
        return function(scope, element, attrs) {
          if (scope.$last) { // all are rendered
            scope.$eval(attrs.repeatDone);
          }
        }
      });

    }());
