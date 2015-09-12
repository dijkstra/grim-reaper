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
            scope.selectItem = function() {
                console.log("clicked item");
            };
        },
        controller: ['$scope', '$element', '$window',  function($scope, $element, $window) {
            $scope.selectItem = function() {
                console.log("clicked item");
            };
        }]
    };
}]);