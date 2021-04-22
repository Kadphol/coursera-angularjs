(function() {
  'use strict';
  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.message = "";

    $scope.check = function() {
      var item = $scope.lunch;
      if(item == '' || item == undefined) {
        $scope.message = "Please enter data first";
        $scope.color = "red";
        return;
      }
      var count = $scope.lunch.split(',').filter((v) => {return v.trim()!== ""}).length;
      if(count <= 3) {
        $scope.message = "Enjoy!";
      }
      else $scope.message = "Too much!";
      $scope.color = "green";
    }
  }
})();