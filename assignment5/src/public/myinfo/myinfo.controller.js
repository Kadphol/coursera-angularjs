(function() {
  'use strict';

  angular
    .module('public')
    .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['SessionStorage'];

  function MyInfoController(SessionStorage) {
    var myCtrl = this;

    myCtrl.user = SessionStorage.getObject('user', '{}');
    if(myCtrl.user !== {}) {
      myCtrl.isSignedUp = true;
    } else {
      myCtrl.isSignedUp = false;
    }
    console.log(myCtrl.isSignedUp);
  }
})();