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
        templateUrl: 'views/directives/listOfStores.html',
        link: function(scope, element) {
            // console.log("Scopes data", scope.data);
        }
        // controller: ['$scope', '$element', '$window',  function($scope, $element, $window) {


        // }]
    };
}]);