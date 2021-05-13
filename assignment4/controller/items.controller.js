(function() {
  'use strict';

  angular.module('MenuApp').controller('itemsController', itemsController);

  itemsController.$inject = ['$stateParams', 'MenuDataService', 'items'];

  function itemsController($stateParams, MenuDataService, items) {
      var itemCtrl = this;
      itemCtrl.items = items;
      itemCtrl.categoryName = $stateParams.categoryName;
  }
})();