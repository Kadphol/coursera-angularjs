(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItems);

  function foundItems() {
    var ddo = {
      templateUrl: 'foundItem.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var search = this;
    search.found = [];
    search.getMatchedMenuItems = function() {
      search.found = [];
      if(search.searchTerm) {
        var promise = MenuSearchService.getMatchedMenuItems(search.searchTerm);
        promise.then(function(response) {
          console.log(response)
          search.found = response;
        })
        .catch(function(err) {
          console.error(err);
        });
      }
    };

    search.removeItem = function (index) {
      search.found.splice(index, 1);
      if(search.found.length == 0) {
        search.error = "Nothing found!"
      }
    };
  };

  MenuSearchService.$inject = ['$http'];
  function MenuSearchService($http) {
    var service = this;
    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: ('https://davids-restaurant.herokuapp.com/menu_items.json')
      }).then(function (result) {
        var foundItems = [];
        var items = result.data.menu_items;

        for(var i = 0; i < items.length; i++) {
          if(items[i].description.indexOf(searchTerm) !== -1) {
            foundItems.push(items[i]);
          }
        }
        return foundItems;
      });
    }
  };
})();