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
        templateUrl: 'views/directives/listOfShit.html',
        link: function(scope, element) {
            // console.log("Scopes data", scope.data);
        }
        // controller: ['$scope', '$element', '$window',  function($scope, $element, $window) {


        // }]
    };
}]);