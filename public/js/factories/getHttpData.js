var contactListApp = angular.module('contactListApp');

contactListApp.factory('getHttpData', function($http) {
   return {
        getContactData: function() {
        return $http.get('/getcontacts')
           	.then(function(result) {
                return result.data;
            });
        }
   }
});