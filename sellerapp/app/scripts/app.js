'use strict';

/**
 * @ngdoc overview
 * @name hackApp
 * @description
 * # hackApp
 *
 * Main module of the application.
 */
angular
  .module('hackApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/newProduct', {
        templateUrl: 'views/newProduct.html',
        controller: 'NewProductCtrl',
        controllerAs: 'newProduct'
      })
      .when('/products', {
        templateUrl: 'views/allProducts.html',
        controller: 'AllProductsController',
        controllerAs: 'allProductsController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
