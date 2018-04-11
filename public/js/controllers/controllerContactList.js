var contactListApp = angular.module('contactListApp');

contactListApp.controller('f1ListCtrl', ['$scope', '$location', '$http', function ($scope, $location,$http) {
	// to do stuff
	$scope.selectedSession = 2005;
	$scope.raceData = {};
	$scope.raceResult = {};
	$scope.selectedRound = 0;

	$scope.setSession = function(session) {
		$scope.selectedSession = session;
		$scope.getRaceData();
	};

	$scope.getRaceData = function() {
		// fetching list of F1 event per year
		var url = 'http://ergast.com/api/f1/'+$scope.selectedSession+'.json';

		$http.get(url).success(function(data) {
			$scope.raceData = data.MRData.RaceTable.Races;
		});
	}

	$scope.getRaceResult = function(season, round) {
		// fetching list of F1 event winner based on selection
		$scope.selectedRound = round;
		var url = 'http://ergast.com/api/f1/'+season+'/'+round+'/'+'results.json';

		$http.get(url).success(function(data) {
			$scope.raceResult = data.MRData.RaceTable.Races[0].Results;
		});
	}
}]);
