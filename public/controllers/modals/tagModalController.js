app = angular.module('Bougie')

app.controller('tagModalController',
['$rootScope', 'tagService', 'userService', '$uibModalInstance', function($rootScope, tagService, userService, $uibModalInstance){
	this.editing = (this.data) ? true : false;

	this.tag = {
		id : this.data._id || null,
		title : this.data.title || ''
	};

	this.tags = [];

	this.addTag = function() {
		var tag = Object.assign({}, this.tag);
		this.tags.push(tag);
		this.tag.title = null;
	};

	this.create = function () {
	    tagService.create(this.tag, function(res) {
        	console.log(res);
          	userService.addTag($rootScope.user._id, res.data._id, function(res){
            	console.log(res.data);
            	$rootScope.user.tags = res.data.tags;
          	}, function(err){
            	console.log(err);
          	});
       	}, function(err) {
           		console.log(err);
       		});
	    $uibModalInstance.close();
	};

	this.update = function() {
		tagService.update(this.tag, function(res) {
          	userService.read($rootScope.user.username, function(res){
            	$rootScope.user.tags = res.data.tags;
          	}, function(err){
            	console.log(err);
          	});
       	}, function(err) {
           		console.log(err);
       		});
	    $uibModalInstance.close();
	};

	this.delete = function() {
		tagService.delete(this.tag.id, function(res) {
          	userService.read($rootScope.user.username, function(res){
            	$rootScope.user.tags = res.data.tags;
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
