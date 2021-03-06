angular.module('Bougie')
.service('modalService', ['$http', '$rootScope', '$uibModal', function($http, $rootScope, $uibModal){
	service = {}

	service.openCategoryModal = function(data) {
		scope = $rootScope.$new();
		scope.title = (data) ? 'Edit Category' : 'Create Category';
		scope.data = data;

		opts = {
			scope : scope,
			templateUrl : '../views/modals/categoryModal.html',
			controller : 'categoryModalController',
			controllerAs : 'modalController',
			bindToController : true
		};
		return $uibModal.open(opts);
	};

	service.openTagModal = function(data) {
		scope = $rootScope.$new();
		scope.title = (data) ? 'Edit Tag' : 'Create Tag';
		scope.data = data;
		opts = {
			scope : scope,
			templateUrl : '../views/modals/tagModal.html',
			controller : 'tagModalController',
			controllerAs : 'modalController',
			bindToController : true,
			size: 'sm'
		};
		return $uibModal.open(opts);
	};

	service.openExpenseModal = function(data) {
		scope = $rootScope.$new();
		scope.title = (data) ? 'Edit Expense' : 'Log Expense';
		scope.data = data;
		opts = {
			scope : scope,
			templateUrl : '../views/modals/expenseModal.html',
			controller : 'expenseModalController',
			controllerAs : 'modalController',
			bindToController : true,
			size: 'md'
		};
		return $uibModal.open(opts);
	};

	service.openLoginModal = function() {
		scope = $rootScope.$new();
		opts = {
			scope : scope,
			templateUrl : '../views/modals/loginModal.html',
			controller : 'loginModalController',
			controllerAs : 'modalController',
			bindToController : true,
			size: 'sm'
		};
		return $uibModal.open(opts);
	};

	return service;
}]);