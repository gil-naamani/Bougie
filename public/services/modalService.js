angular.module('Bougie')
.service('modalService', ['$http', '$rootScope', '$uibModal', function($http, $rootScope, $uibModal){
	service = {}

	service.openCategoryModal = function(data) {
		scope = $rootScope.$new();
		scope.title = (data) ? 'Edit Category' : 'Create Category'
		scope.data = data

		opts = {
			scope : scope,
			templateUrl : '../views/modals/categoryModal.html',
			controller : 'categoryModalController',
			controllerAs : 'modalController',
			bindToController : true
		}
		return $uibModal.open(opts);
	}

	service.openLoginModal = function() {
		scope = $rootScope.$new();
		opts = {
			scope : scope,
			templateUrl : '../views/modals/loginModal.html',
			controller : 'loginModalController',
			controllerAs : 'modalController',
			bindToController : true,
			size: 'sm'
		}
		return $uibModal.open(opts);
	}

	return service;
}]);