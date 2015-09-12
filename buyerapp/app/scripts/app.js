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
    'shit.services.StoreService'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/discoverStores.html',
        controller: 'DiscoverStoresCtrl',
        controllerAs: 'discoverStore'
      })
      .when('/random', {
        templateUrl: 'views/discovery.html',
        controller: 'DiscoveryCtrl',
        controllerAs: 'discovery'
      })
      .when('/store/:storeId/item/:itemId', {
        templateUrl: 'views/itemDetails.html',
        controller: 'ItemDetailsCtrl',
        controllerAs: 'itemDetails'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

  // .config(['$stateProvider', '$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {




  //       $stateProvider.state('index', {
  //           url: '/',
  //           templateUrl: 'partials/main',
  //           controller: 'DiscoveryCtrl'
  //       });

  //       $urlRouterProvider.otherwise(function($injector, $location){
  //           // This is triggered when you you cant find a state.

  //           $injector.invoke(['$state', '$log', function($state, $log) {
  //               $log.info('404 Page not Found.', $location.$$url);
  //               $state.go('404');
  //           }]);
  //       });

  //       $stateProvider.state('404', {
  //           templateUrl: 'partials/notFound'
  //       });

  //       $locationProvider.html5Mode(true);
  //   }]);
