var contactListApp = angular.module('contactListApp', [
'ngRoute'
]);

contactListApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'homeCtrl'
      }).
      when('/f1list', {
        templateUrl: 'partials/f1List.html',
        controller: 'f1ListCtrl'
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