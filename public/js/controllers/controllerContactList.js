var contactListApp = angular.module('contactListApp');

contactListApp.controller('contactListCtrl', ['$scope', '$location', '$http', 'getHttpData', function ($scope, $location,$http, getHttpData) {
	getHttpData.getContactData().then(function(data) {
        $scope.contactList = data;
        $scope.numPerPage = 5;
	$scope.noOfPages = Math.ceil($scope.contactList.length / $scope.numPerPage);
	$scope.currentPage = 1;

	$scope.setPage = function () {
	   $scope.data = $scope.get( ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage );
	};
    });

    
	  
	$scope.$watch( 'currentPage', $scope.setPage );

	$scope.get = function(offset, limit) {
      return $scope.contactList.slice( offset, offset+limit );
    },
    $scope.count = function() {
      return $scope.contactList.length;
    }

}]);
