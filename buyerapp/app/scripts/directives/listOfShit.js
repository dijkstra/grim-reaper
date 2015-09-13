'use strict';

angular.module('shit.directives.listOfShit', [])
.directive('listOfShit', ['$interval', function($interval) {

    return {
        restrict: 'E',
        replace: true,
        scope: {
            data: '=',
            stateRef: '@'
        },
        templateUrl: 'views/directives/listOfShit.html',
        link: function (scope, element) {
        	var timeoutId;
        	element.on('$destroy', function() {
		      $interval.cancel(timeoutId);
		    });
        	console.log(scope);
		    // start the UI update process; save the timeoutId for canceling
		    timeoutId = $interval(function() {
		    	scope.data.forEach(function (product) {
		    		if (typeof product.finalPrice === 'undefined') {
		    			product.finalPrice = product.price;
		    		}
		    		var t1 = product.startTime.getTime();
		    		var t2 = product.endTime.getTime();
		    		var t = Date.now();
		    		var price = product.price;

		    		var p = (t-t1)*100/(t2-t1);

		    		product.finalPrice = product.price*((100-p)/100);
		    	});
		    	// console.log(scope)
		      //updateTime(); // update DOM
		    }, 1000);
        }
    };
}]);