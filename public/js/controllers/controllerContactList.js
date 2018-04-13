var contactListApp = angular.module('contactListApp');

contactListApp.controller('contactListCtrl', ['$scope', '$location', '$http', 'getHttpData', 'ngToast', '$timeout',
	function ($scope, $location, $http, getHttpData, ngToast, $timeout) {
	
	$scope.switchOption = 'search';
	$scope.contactList = [];
	$scope.fullContactList = [];
	$scope.unFilteredList = [];
	$scope.numPerPage = 4;
	$scope.currentPage = 1;
	$scope.indexToUpdate = 0;

	$scope.emailList = [{}];
	$scope.phoneList = [{}];

	$scope.clearAddFields = function() {
	    $scope.emailList = [{}];
		$scope.phoneList = [{}];
		$scope.fName = '';
		$scope.lName = '';
	}

	$scope.changeInName = function() {
		 $timeout(function() {		 	
		 	$scope.$apply(function() {
			    $scope.fName = angular.element($('#fnameid')).val();
		 		$scope.lName = angular.element($('#lnameid')).val();
			});
	    }, 0);
	}

	getHttpData.getContactData().then(function(result) {
        $scope.fullContactList = result.data;
        $scope.unFilteredList = result.data;
		$scope.noOfPages = Math.ceil($scope.count() / $scope.numPerPage);
		$scope.setPage();
    });

	$scope.setPage = function () {
	   $scope.contactList = $scope.get($scope.fullContactList, ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage);
	};

	$scope.$watch('currentPage', $scope.setPage);

	$scope.get = function(arr, offset, limit) {
      return arr.slice(offset, offset+limit);
    };

    $scope.count = function() {
      return $scope.fullContactList.length;
    };

    $scope.addLine = function(field) {
    	if(field === 'email') {
    		$scope.emailList.push({});
    	} else {
    		$scope.phoneList.push({});
    	}      
    };

    $scope.removeLine = function(field) {
    	if(field === 'email') {
    		if($scope.emailList.length > 1) {
    			$scope.emailList.splice(-1,1)
    		}
    	} else {
    		if($scope.phoneList.length > 1) {
	    		$scope.phoneList.splice(-1,1)
	    	}
    	}
    };

    $scope.addContact = function() {
    	var newObj = {
			"sno": $scope.fullContactList.length+1,
	        "fname": $scope.fName,
	        "lname": $scope.lName,
	        "email": [],
	        "contact": []
	    }
	    newObj.email = $scope.emailList;
	    newObj.contact = $scope.phoneList;
	    console.log(newObj);
      	$scope.fullContactList.push(newObj);
      	ngToast.create('Details added successfully');
      	$scope.setPage();
      	$scope.clearAddFields();
      	$scope.switchOption = 'search';
    };

    $scope.editContact = function(index) {
    	$scope.switchOption = 'edit';
    	$scope.clearAddFields();
    	var updateContact = $scope.fullContactList[index];
    	console.log(updateContact);
    	$scope.fName = updateContact.fname;
    	$scope.lName = updateContact.lname;
    	$scope.emailList = updateContact.email;
    	$scope.phoneList = updateContact.contact;
    	$scope.indexToUpdate = index;
    }

    $scope.updateContact = function() {
    	var updateObj = {
			"sno": $scope.indexToUpdate+1,
	        "fname": $scope.fName,
	        "lname": $scope.lName,
	        "email": [],
	        "contact": []
	    }
	    updateObj.email = $scope.emailList;
	    updateObj.contact = $scope.phoneList;
    	$scope.fullContactList[$scope.indexToUpdate] = updateObj;
		ngToast.create('Details updated successfully');
		$scope.setPage();
		$scope.clearAddFields();
		$scope.switchOption = 'search';
    };

    $scope.searchFilter = function() {
    	$scope.fullContactList = $scope.unFilteredList;
    	if(!$scope.inputSearch){
    		$scope.fullContactList = $scope.unFilteredList;
    		$scope.setPage();
            return;
        }
    	var result = [];
    	var searchString = $scope.inputSearch.toLowerCase();
		angular.forEach($scope.fullContactList, function(item){
	        if(item.fname.toLowerCase().indexOf(searchString) !== -1 || item.lname.toLowerCase().indexOf(searchString) !== -1){
	        	result.push(item);
	    	}
	    });
	    $scope.fullContactList = result;
	    $scope.contactList = $scope.get(result, ($scope.currentPage - 1) * $scope.numPerPage, $scope.numPerPage);
    }

}]);
