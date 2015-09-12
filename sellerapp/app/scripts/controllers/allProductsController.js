'use strict';

/**
 * @ngdoc function
 * @name hackApp.controller:AllproductscontrollerCtrl
 * @description
 * # AllproductscontrollerCtrl
 * Controller of the hackApp
 */
angular.module('hackApp')
  .controller('AllProductsController', ['$scope', '$http', function ($scope, $http) {
  	// http://146.148.25.35/api/sellers/55f442927ddd3ada0a000001/items

    $http.get('http://146.148.25.35/api/sellers/55f442927ddd3ada0a000001/items')
    	.then(function (response) {
    		console.log(response);
    		$scope.allProducts = response.data;
    	}, function (error) {
    		console.log('This failed again');
    	});
  }]);
