(function() {
  'use strict';
  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {
    $scope.lunch = "";
    $scope.message = "";

    $scope.check = function() {
      var count = $scope.lunch.split(',').length;
      if(count == 1) {
        if($scope.lunch.split(',')[0] == "") $scope.message = "Please enter data first";
        else $scope.message = "Enjoy!";
      }
      else if(count > 3) $scope.message = "Too much!";
      else $scope.message = "Enjoy!";
    }
  }
})();