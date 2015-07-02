var app = angular.module('App', ['restangular']);

app.config(["RestangularProvider",function(RestangularProvider){
	RestangularProvider.setRestangularFields({
		id: "_id"
	});
}]);

app.controller('PersonListCtrl', function($scope, Restangular){
	var basePeople = Restangular.all('people');

	$scope.people = basePeople.getList().$object;

	$scope.add = function() {
		$scope.people.post($scope.newperson).then(function(person){
			$scope.people.push(person);
		});
		$scope.newperson = {};
	}

	$scope.delete = function(person) {
		person.remove().then(function() {
			var index = $scope.people.indexOf(person);
			if (index > -1) $scope.people.splice(index, 1);
		});
	};
});