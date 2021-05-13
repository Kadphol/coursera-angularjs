(function() {
  'use strict';

  angular.module('Data')
  .service('MenuDataService');

  MenuDataService.$inject = ['$http'];
  function MenuDataService($http) {
    var service = this;

    service.getAllCategories = function () {
      return $http({
        methods: 'GET',
        url: ('https://davids-restaurant.herokuapp.com/categories.json')
      }).then(function(res) {
        console.log(res.data);
        return res.data;
      });
    };

    service.getItemsForCategory = function (categoryShortName) {
      return $http({
        method: 'GET',
        url: ('https://davids-restaurant.herokuapp.com/menu_items.json?category=' + categoryShortName)
      }).then(function(res) {
        console.log(res.data.menu_items);
        return res.data.menu_items;
      });
    }

  }
})();