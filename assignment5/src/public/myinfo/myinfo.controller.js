(function() {
  'use strict';

  angular
    .module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['SessionStorage'];

  function MyInfoController(SessionStorage) {
    var myCtrl = this;

    myCtrl.user = SessionStorage.getObject('user', '{}');
    myCtrl.notSignedUp = angular.equals({}, myCtrl.user);
    console.log(myCtrl.notSignedUp);
  }
})();