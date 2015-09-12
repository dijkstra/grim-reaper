'use strict';

angular.module('shit.directives.listOfShit', [])
.directive('listOfShit', [function() {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            stateRef: '@'
        },
        templateUrl: 'views/directives/listOfShit.html'
        // controller: ['$scope', '$element', '$window',  function($scope, $element, $window) {


        // }]
    };
}]);