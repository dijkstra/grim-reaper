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
        templateUrl: '/views/directives/shitItem.html',
        link: function(scope, element) {
            console.log("Item scopes data", scope.data);
        }
        // controller: ['$scope', '$element', '$window',  function($scope, $element, $window) {


        // }]
    };
}]);