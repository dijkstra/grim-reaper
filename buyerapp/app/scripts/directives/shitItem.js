'use strict';

angular.module('shit.directives.shitItem', [])
.directive('shitItem', [function() {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            stateRef: '@'
        },
        templateUrl: '/views/directives/shitItem.html'
    };
}]);