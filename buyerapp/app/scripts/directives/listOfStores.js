'use strict';

angular.module('shit.directives.listOfStores', [])
.directive('listOfStores', [function() {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            stateRef: '@'
        },
        templateUrl: 'views/directives/listOfStores.html'
    };
}]);