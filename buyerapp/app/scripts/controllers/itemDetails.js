'use strict';

angular.module('shitForSaleApp')
    .controller('ItemDetailsCtrl', ['$scope', '$routeParams', 'StoreService',
        function($scope, $routeParams, StoreService) {
            $scope.data = {};

            StoreService.getStoreById($routeParams.storeId).then(function(store) {
                console.log("store", store);
                $scope.store = store;
            });
            StoreService.getItemsForStore($routeParams.storeId).then(function(items) {
                items.forEach(function(item) {
                    console.log("get items", item);
                    if (item._id == $routeParams.itemId) {
                        $scope.data = item;
                    }
                })
            });
        }]);