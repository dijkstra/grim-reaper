'use strict';

angular.module('shitForSaleApp')
    .controller('DiscoverStoresCtrl', ['$scope', 'StoreService',
        function($scope, StoreService) {

            $scope.allStores = {};
            StoreService.getAllStores().then(function(data) {
                $scope.allStores = data;
                console.log("All Stores", data);
                data.forEach(function(store) {
                    StoreService.getItemsForStore().then(function(items) {
                        console.log("All items for store", store.name, data);
                        store.items = items;
                    })
                })
            });
        }]);