app = angular.module('Bougie')

app.controller('categoryModalController',
['$rootScope', 'categoryService', 'userService', '$uibModalInstance', function($rootScope, categoryService, userService, $uibModalInstance){
	this.editing = (this.data) ? true : false;

	this.category = {
		id : this.data._id || null,
		title : this.data.title || '',
		amt : this.data.amt || ''
	};

	this.categories = [];

	this.addCategory = function() {
		cat = Object.assign({}, this.category);
		this.categories.push(cat);
		this.category.title = null;
		this.category.amt = null;
	};

	this.isShowAnother = function() {
		if (this.category.title == null || this.category.title.lenght === 0) { 
			return false ;
		}
		if (this.category.amt == null || this.category.amt === 0){
			return false;
		}
		return !this.editing;
	};

	this.create = function () {
	    categoryService.create(this.category, function(res) {
        	console.log(res);
          	userService.addCategory($rootScope.user._id,res.data._id,function(res){
            	console.log(res.data);
            	$rootScope.user.categories = res.data.categories;
          	}, function(err){
            	console.log(err);
          	});
       	}, function(err) {
           		console.log(err);
       		});
	    $uibModalInstance.close();
	};

	this.update = function() {
		categoryService.update(this.category, function(res) {
          	userService.read($rootScope.user.username, function(res){
            	$rootScope.user.categories = res.data.categories;
          	}, function(err){
            	console.log(err);
          	});
       	}, function(err) {
           		console.log(err);
       		});
	    $uibModalInstance.close();
	};

	this.delete = function() {
		categoryService.delete(this.category.id, function(res) {
          	userService.read($rootScope.user.username, function(res){
            	$rootScope.user.categories = res.data.categories;
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
