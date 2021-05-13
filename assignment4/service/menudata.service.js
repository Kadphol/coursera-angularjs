(function() {
  'use strict';

  angular.module('MenuApp')
  .service('MenuDataService', MenuDataService)
  .constant('BasePath', "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$http', 'BasePath'];
  function MenuDataService($http, BasePath) {
    var service = this;

    service.getAllCategories = function() {
      return $http({
        method: "GET",
        url: (BasePath + "/categories.json")
      })
      .then(function(response){
        console.log(response.data);
        return response.data;
      });
    };

    service.getItemsForCategory = function(categoryShortName) {
      return $http({
        method: "GET",
        url: (BasePath + "/menu_items.json?category=" + categoryShortName)
      })
        .then(function(response){
          console.log(response.data.menu_items);
          return response.data.menu_items;
        });
    };
  };
})();