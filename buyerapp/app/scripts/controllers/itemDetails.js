'use strict';

angular.module('shitForSaleApp')
    .controller('ItemDetailsCtrl', ['$scope', '$routeParams', 'StoreService', 'ItemService', 'PayService',
        function($scope, $routeParams, StoreService, ItemService, PayService) {
            var fakeStore = {
                _id: "55f442927ddd3ada0a000001",
                description: "0",
                address: "Drottninggatan 12",
                name: "Eriks teashop",
            };
            var fakeItem = {
                _id: "55f47d52b2fd13161f000008",
                imageId: "http://146.148.25.35/api/images/55f47d51b2fd13161f000001",
                endTime: "2015-09-12T19:00:00.000Z",
                price: 100,
                amount: 5,
                sellerId: "55f442927ddd3ada0a000001",
                title: "Walle",
                startTime: new Date(),
                description: 'Fyra jättegoda bullar som vad bakade 10 timmar sedan.'
            };

            $scope.quantity = 1;
            StoreService.getStoreById($routeParams.storeId).then(function(store) {
                console.log("store", store);
                $scope.store = fakeStore;
            });

            ItemService.getItemById($routeParams.itemId).then(function(item) {
                console.log("item recived", item);
                $scope.item = item;
                $scope.updatePrice();
            }, function(err) {
                console.log("error", err);
            });

            $scope.updatePrice = function() {
                $scope.totalPrice = $scope.quantity * $scope.item.price;
            };
            // $scope.item = fakeItem;
            // $scope.updatePrice();

            PayService.getToken().then(function(clientToken) {
                braintree.setup(clientToken, "dropin", {
                    container: "payment-form"
                });
            });

            $scope.submit = function() {
                var elem = angular.element("input[name='payment_method_nonce']");
                console.log(angular.element("input[name='payment_method_nonce']"));

                var data = {
                    id: $scope.item._id,
                    price: $scope.totalPrice,
                    quantity: $scope.quantity,
                    payment_method_nonce: elem.val()
                };

                PayService.buyItem(data)
                    .then(function() {
                        // TODO: Do something.
                        console.log("item was bought!");
                    }, function(err) {
                        console.log('Failed to buy item', err);
                    });
            };
        }]);