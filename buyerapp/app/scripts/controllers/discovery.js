'use strict';

angular.module('shitForSaleApp')
    .controller('DiscoveryCtrl', ['$scope', 'ItemService',
        function($scope, ItemService) {

            $scope.allItems = {};
            ItemService.getAllItems().then(function(data) {
                $scope.allItems = data;
                console.log("All items", data);
            });
        }]);