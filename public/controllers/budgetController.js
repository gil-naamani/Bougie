Bougie.controller('budgetController', ['$rootScope', '$scope', '$uibModal', '$log', '$http', 'categoryService', 'userService', 'modalService',
  function($rootScope, $scope, $uibModal, $log, $http, categoryService, userService, modalService){

  	$scope.categories = $rootScope.user.categories;
  	$scope.tags = $rootScope.user.tags;
  	$scope.expenses = $rootScope.user.expenses;

}]);
