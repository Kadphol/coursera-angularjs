(function() {

  "use strict";

  angular
    .module('public')
    .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['$scope', 'MenuService', 'SessionStorage'];
  function SignUpController($scope, MenuService, SessionStorage) {
    var signupCtrl = this;

    signupCtrl.user = {};
    signupCtrl.infoSaved = false;
    if(SessionStorage.getObject('user', '{}') !== {}) {
      signupCtrl.infoSaved = true;
    }
    console.log(signupCtrl.infoSaved);
    signupCtrl.validMenuNumber = false;

    signupCtrl.checkMenuNumber = function () {
      var short = signupCtrl.user.menuNum ? signupCtrl.user.menuNum.toUpperCase() : '';
      MenuService.getMenuByShortName(short)
        .then(function(res) {
          signupCtrl.user.menuItem = res;
          signupCtrl.validMenuNumber = true;
        })
        .catch(function(res) {
          signupCtrl.validMenuNumber = false;
        });
    };

    signupCtrl.submitForm = function () {
      console.log(signupCtrl.user);
      console.log($scope.signupForm);
      if($scope.signupForm.$valid && signupCtrl.validMenuNumber) {
        delete signupCtrl.user.menuNum;
        SessionStorage.storeObject('user', signupCtrl.user);
        signupCtrl.infoSaved = true;
        $scope.signupForm.$setPristine();
        $scope.signupForm.$setUntouched();
        signupCtrl.user = {};
        console.log(signupCtrl.infoSaved);
      } else {
        if (signupCtrl.infoSaved) {
          signupCtrl.infoSaved = false;
          console.log(signupCtrl.infoSaved);
        }
      }
    };
  }
})();