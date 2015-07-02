var app = angular.module('App', []);

app.controller('PersonListCtrl', function($scope){
	$scope.people = [];

	$scope.add = function(){
		$scope.people.push({});
	}

	$scope.update = function(person) {

	}

	$scope.remove = function(person) {
		
	}
});