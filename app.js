(function () {
  'use strict';
  angular.module('NameCalculator', [])
  .controller('NameCalculatorController', function ($scope) {
    $scope.name = "";
    $scope.totalValue = 0;

    $scope.displayNumeric = function() {
      var total = calculateNumbericForString($scope.name);
      $scope.totalValue = total;
    };

    function calculateNumbericForString(string) {
      var totalString = 0;
      for(var i = 0; i < string.length; i++) {
        totalString += string.charCodeAt(i);
      }
      return totalString;
    };
  });
})();