(function() {
  'use strict';

  angular.module('MenuApp')
  .controller('categoriesController', categoriesController);

  categoriesController.$inject = ['MenuDataService', 'categories'];
  function categoriesController(MenuDataService, categories) {
    var catCtrl = this;
    catCtrl.categories = categories;
  };
})();