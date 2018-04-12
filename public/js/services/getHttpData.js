var contactListApp = angular.module('contactListApp');

contactListApp.factory('getHttpData', function($http) {
   return {
        getContactData: function() {
        return $http.get('./json/contact_list.json')
           	.then(function(result) {
                return result.data;
            });
        }
   }
});