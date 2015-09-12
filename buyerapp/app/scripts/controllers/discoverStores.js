'use strict';

angular.module('shitForSaleApp')
    .controller('DiscoverStoresCtrl', ['$scope', 'StoreService',
        function($scope, StoreService) {

            $scope.allStores = {};
            StoreService.getAllStores().then(function(data) {
                $scope.allStores = data;
                console.log("All Stores", data);
                data.forEach(function(store) {
                    console.log("get items");
                    StoreService.getItemsForStore(data._id).then(function(items) {
                        console.log("All items for store", store.name, data);
                        store.items = items;
                    }, function() {
                        console.log('aj då');
                    });
                })
            });
        }]);