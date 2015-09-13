'use strict';

angular.module('shitForSaleApp')
    .controller('DiscoverStoresCtrl', ['$scope', 'StoreService',
        function($scope, StoreService) {

            $scope.allStores = {};
            var s = {};
            StoreService.getAllStores().then(function(data) {

                s = data;

                data.forEach(function(store, i) {

                    StoreService.getItemsForStore(store._id).then(function(items) {

                        s[i].items = items;
                        if (i === (s.length - 1)) {
                            $scope.allStores = s;
                        }
                    }, function() {
                        console.log('ouch!');
                    });
                });
            });
        }]);