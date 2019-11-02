(function() {

  'use strict';

  angular
    .module('app')
    .run(run);

  run.$inject = ['$rootScope', 'authService', 'lock', 'authManager', 'jwtHelper', '$state', '$timeout'];

  function run($rootScope, authService, lock, authManager, jwtHelper, $state, $timeout) {
    // Put the authService on $rootScope so its methods
    // can be accessed from the nav bar
    $rootScope.authService = authService;

    // Register the authentication listener that is
    // set up in auth.service.js
    authService.registerAuthenticationListener();

    // Use the authManager from angular-jwt to check for
    // the user's authentication state when the page is
    // refreshed and maintain authentication
    authManager.checkAuthOnRefresh();

    // Register synchronous hash parser
    lock.interceptHash();

    authManager.redirectWhenUnauthenticated();

    $rootScope.$on("$stateChangeSuccess", function(event, toState) {
      $timeout(function() { // Needed to ensure the title is changed *after* the url so that history entries are correct.
        $(document).prop('title', toState.data.pageTitle + " | Buff Daddy");
      });
    });
  }

})();
