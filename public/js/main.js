var contactListApp = angular.module('contactListApp', ['ngRoute','ngToast']);

contactListApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      }).
      when('/contactlist', {
        templateUrl: 'partials/contactList.html',
        controller: 'contactListCtrl'
      }).
      when('/services', {
        templateUrl: 'partials/services.html',
        controller: 'homeCtrl'
      }).
      when('/career', {
        templateUrl: 'partials/career.html',
        controller: 'homeCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      });
  }]);