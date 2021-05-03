(function () {
  'use strict';
  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', foundItems)
  .directive('itemsLoaderIndicator', itemsLoaderIndicator);

  function foundItems() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'foundItem.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };
    return ddo;
  }

  function itemsLoaderIndicator() {
    var ddo = {
      restrict: 'E',
      templateUrl: 'loader/itemsloaderindicator.template.html',
      link: function(scope, element) {
        scope.watch('search.isLoading', function(newValue, oldValue) {
          if (newValue == true) {
            var div =  element.find('div')
            div.css('display', 'block');
          } else {
            var div =  element.find('div')
            div.css('display', 'none');
          }
        });
      }
    };
    return ddo;
  };

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var search = this;
    search.found = [];
    search.isLoading = false;
    search.nothing = false;
    search.getMatchedMenuItems = function() {
      search.found = [];
      if(search.searchTerm) {
        search.isLoading = true;
        var promise = MenuSearchService.getMatchedMenuItems(search.searchTerm);
        promise.then(function(response) {
          search.found = response;
          search.nothing = false;
        })
        .catch(function(err) {
          console.error(err);
          search.nothing = true;
        });
      } else {
        search.isLoading = false;
        search.nothing = true;
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