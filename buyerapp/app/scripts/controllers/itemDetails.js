'use strict';

angular.module('shitForSaleApp')
    .controller('ItemDetailsCtrl', ['$scope', '$routeParams', 'StoreService', 'ItemService',
        function($scope, $routeParams, StoreService, ItemService) {
            // var fakeStore = {
            //     _id: "55f442927ddd3ada0a000001",
            //     description: "0",
            //     address: "Drottninggatan 12",
            //     name: "Eriks teashop",
            // };
            // var fakeItem = {
            //     _id: "55f47d52b2fd13161f000008",
            //     imageId: "http://146.148.25.35/api/images/55f47d51b2fd13161f000001",
            //     endTime: "2015-09-12T19:00:00.000Z",
            //     price: 100,
            //     amount: 5,
            //     sellerId: "55f442927ddd3ada0a000001",
            //     title: "Walle"
            // };

            $scope.guantity = 1;
            StoreService.getStoreById($routeParams.storeId).then(function(store) {
                console.log("store", store);
                $scope.store = store;
            });

            ItemService.getItemById($routeParams.itemId).then(function(item) {
                console.log("item recived", item);
                $scope.item = item;
                $scope.updatePrice();
            });

            $scope.updatePrice = function() {
                $scope.totalPrice = $scope.quantity * $scope.item.price;
            };

            $scope.submit = function() {

                var data = {
                    id: $scope.item._id,
                    price: $scope.totalPrice,
                    quantity: $scope.quantity
                };

                ItemService.buyItem(data)
                    .then(function() {
                        // TODO: Do something.
                        console.log("item was bought!");
                    }, function(err) {
                        console.log('Failed to buy item', err);
                    });
            };
        }]);