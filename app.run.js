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

    // $rootScope.$on('$stateChangeStart',
    //   function(event, to, toParams) {
    //     $rootScope.isNavigating = true;

    //     var token = localStorage.getItem('id_token');
    //     if (to.data && to.data.requiresLogin) {
    //       if (!token || jwtHelper.isTokenExpired(token)) {
    //         $timeout(function() {
    //           $state.go('login');
    //         });
    //       }
    //     }
    //   }
    // );
  }

})();
