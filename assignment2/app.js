(function() {
  'use strict';
  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  var List = [
    {
      name: "cookies",
      quantity: 10
    },
    {
      name: "milk",
      quantity: 1
    },
    {
      name: "sodas",
      quantity: 22
    },
    {
      name: "salad",
      quantity: 3
    },
    {
      name: "cigars",
      quantity: 12
    }
  ];
  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.list = ShoppingListCheckOffService.getShoppingList();
    toBuy.boughtItem = function (itemIndex) {
      ShoppingListCheckOffService.boughtItem(itemIndex);
    }
  };

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.list = ShoppingListCheckOffService.getBoughtList();
  };

  function ShoppingListCheckOffService() {
    var service = this;

    var shoppingList = List;
    var boughtList = [];
    
    service.boughtItem = function(itemIndex) {
      var bought = shoppingList.splice(itemIndex, 1);
      boughtList.push(bought);
    };

    service.getShoppingList = function() {
      return shoppingList;
    };

    service.getBoughtList = function() {
      return boughtList;
    };
  }

})();