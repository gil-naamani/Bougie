app = angular.module('Bougie')

app.controller('expenseModalController',
['$rootScope', 'expenseService', 'userService', '$uibModalInstance', function($rootScope, expenseService, userService, $uibModalInstance){
	this.editing = (this.data) ? true : false;

	this.expense = {
		id : this.data._id || null,
		description : this.data.description || '',
		amt : this.data.amt || '',
		category : this.data.category || {},
		tag 	 : this.data.tag || {}
	};

	this.expenses = [];
	this.categories = $rootScope.user.categories;
	this.tags = $rootScope.user.tags;

	this.create = function () {
	    expenseService.create(this.expense, function(res) {
        	console.log(res);
          	userService.addExpense($rootScope.user._id,res.data._id,function(res){
            	console.log(res.data);
            	$rootScope.user.expenses = res.data.expenses;
          	}, function(err){
            	console.log(err);
          	});
       	}, function(err) {
           		console.log(err);
       		});
	    $uibModalInstance.close();
	};

	this.update = function() {
		expenseService.update(this.expense, function(res) {
          	userService.read($rootScope.user.username, function(res){
            	$rootScope.user.expenses = res.data.expenses;
          	}, function(err){
            	console.log(err);
          	});
       	}, function(err) {
           		console.log(err);
       		});
	    $uibModalInstance.close();
	};

	this.delete = function() {
		expenseService.delete(this.expense.id, function(res) {
          	userService.read($rootScope.user.username, function(res){
            	$rootScope.user.expenses = res.data.expenses;
          	}, function(err){
            	console.log(err);
          	});
       	}, function(err) {
           		console.log(err);
       		});
	    $uibModalInstance.close();
	};

	this.cancel = function () {
	    $uibModalInstance.dismiss('cancel');
	};
}]);
