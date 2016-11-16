'use strict';

// Setting up route
VinApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
  function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.html5Mode(true);



    // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");

    // Home state routing
    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.client.view.html'
    })
    .state('not-found', {
      url: '/not-found',
      templateUrl: 'views/not-found.client.view.html'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'views/contact.client.view.html'
    })
    .state('privacy', {
      url: '/privacy',
      templateUrl: 'views/privacy.client.view.html'
    })
    .state('terms', {
      url: '/terms',
      templateUrl: 'views/terms.client.view.html'
    })
    .state('example-report', {
      url: '/example-report',
      templateUrl: 'views/reports/index.client.view.html'
    })
    .state('checkout', {
      url: '/checkout/:vin',
      templateUrl: 'views/checkout.client.view.html'
    });
  }
]);