'use strict';

/**
 * @ngdoc overview
 * @name shitForSaleApp
 * @description
 * # shitForSaleApp
 *
 * Main module of the application.
 */
angular
  .module('shitForSaleApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'shit.directives.listOfStores',
    'shit.directives.listOfShit',
    'shit.directives.shitItem',
    'shit.services.BaseService',
    'shit.services.ItemService',
    'shit.services.StoreService',
    'shit.services.PayService'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/discovery.html',
        controller: 'DiscoveryCtrl',
        controllerAs: 'discovery'
      })
      .when('/stores', {
        templateUrl: 'views/discoverStores.html',
        controller: 'DiscoverStoresCtrl',
        controllerAs: 'discoverStore'
      })

      .when('/stores/:storeId/items/:itemId', {
        templateUrl: 'views/itemDetails.html',
        controller: 'ItemDetailsCtrl',
        controllerAs: 'itemDetails'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/success', {
        templateUrl: 'views/success.html',
        controllerAs: 'success'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
