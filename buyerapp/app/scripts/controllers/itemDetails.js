'use strict';

angular.module('shitForSaleApp')
    .controller('ItemDetailsCtrl', ['$scope', '$routeParams', 'StoreService', 'ItemService', 'PayService',
        function($scope, $routeParams, StoreService, ItemService, PayService) {

            $scope.price = $routeParams.price;
            $scope.quantity = 1;
            StoreService.getStoreById($routeParams.storeId).then(function(store) {
                console.log("store", store);
                $scope.store = store;
            });

            ItemService.getItemById($routeParams.itemId).then(function(item) {
                console.log("item recived", item);
                $scope.item = item;

            }, function(err) {
                console.log("error", err);
            });

            $scope.updatePrice = function() {
                $scope.totalPrice = $scope.quantity * $scope.price;
            };
            $scope.updatePrice();

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