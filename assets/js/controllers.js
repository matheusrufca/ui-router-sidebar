angular.module('app')
  .controller('DashboardController', function ($scope, $stateParams, carService) {
  })
  .controller('ListCtrl', function () { })
  .controller('DetailCtrl', function ($scope, $stateParams) {
  	$scope.id = $stateParams.id;
  })


  .controller('CarListController', function ($scope, $stateParams, carService) {
  	var self = {};

  	self.init = function () {
  		$scope.getCars();
  	};

  	$scope.cars = [];

  	$scope.getCars = function () {

  		carService.get().then(function (carList) {
  			if (!angular.isArray(carList)) { return; }

  			$scope.cars = carList;
  		}, function (error) {
  		})
  	};

  	$scope.remove = function (item) {
  		carService.remove(item.id).then(function (result) {
  			$scope.cars.splice(item, 1);
  		}, function (err) {
  		})

  	};


  	self.init();
  })
	.controller('CarDetailController', function ($scope, $stateParams, carService) {
		var self = {};

		$scope.id = $stateParams.id;
		$scope.car = {};

		$scope.$watch('id', function (newValue, oldValue) {
			$scope.getDetail($scope.id);
		});
		
		$scope.cars = [];
		$scope.car = {};

		$scope.getDetail = function (item_id) {

			carService.getDetail(item_id).then(function (car) {
				if (!car) { return; }
				$scope.car = car;
			}, function (error) {
			});
		};

		$scope.remove = function (item) {
			carService.remove(item.id).then(function (result) {
				$scope.cars.splice(item, 1);
			}, function (err) {
			});
		};

	});
