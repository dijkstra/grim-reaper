'use strict';

angular.module('shitForSaleApp')
    .controller('ItemDetailsCtrl', ['$scope', '$routeParams', 'StoreService', 'ItemService',
        function($scope, $routeParams, StoreService, ItemService) {
            // $scope.data = {};

            StoreService.getStoreById($routeParams.storeId).then(function(store) {
                console.log("store", store);
                $scope.store = store;
            });

            ItemService.getItemById($routeParams.itemId).then(function(item) {
                console.log("items recived", item);
                $scope.item = item;
            });

            $scope.updatePrice = function(valu) {
                console.log("update the price", valu);
                $scope.totalPrice = valu * item.price;
            };

            // StoreService.getItemsForStore($routeParams.storeId).then(function(items) {
            //     items.forEach(function(item) {
            //         console.log("get items", item);
            //         if (item._id == $routeParams.itemId) {
            //             $scope.data = item;
            //         }
            //     })
            // });
        }]);