(function() {
	var app = angular.module('signup', ['cgNotify']);

	app.controller('SignupController', ['$scope', '$http', '$window', 'notify', function($scope, $http, $window, notify) {
		$scope.details = {
			firstName: null,
			lastName: null,
			email: null,
			password: null,
			cPassword: null
		};

		$scope.validatePassword = function() {
			if($scope.details.password === $scope.details.cPassword) {
				return true;
			} else {
				return false;
			}
		}

		$scope.checkStrength = function() {
			return $scope.details.password && $scope.details.password.length > 6;
		}

		$scope.submit = function() {
			console.log($scope.checkStrength() || !$scope.validatePassword());
			$http.post('/user', {
				firstName: $scope.details.firstName,
				lastName: $scope.details.lastName,
				email: $scope.details.email,
				password: $scope.details.password
			}).success(function(data) {
				$window.location.href = '/';
				notify('Sign up successful');
			}).error(function(err) {
				notify(err.msg);
			});
		}
	}]);
})();