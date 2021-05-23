(function() {
  'use strict';

  angular
    .module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['SessionStorage', 'ApiPath'];

  function MyInfoController(SessionStorage, ApiPath) {
    var myCtrl = this;

    myCtrl.user = SessionStorage.getObject('user', '{}');
    myCtrl.notSignedUp = angular.equals({}, myCtrl.user);
    myCtrl.apipath = ApiPath;
    console.log(myCtrl.notSignedUp);
  }
})();