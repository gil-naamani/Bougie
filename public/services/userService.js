angular.module('Bougie')
.factory('userService', ['$http', function($http){

  return {
    read: function(id, success, error) {
        $http.get('/user/'+id).success(success).error(error)
    },
    addCategory: function(id, categoryId, success, error) {
        var data = {
          id : id,
          category : categoryId
        };
        $http.put('/user/categories', data).success(success).error(error)
    },
    addTag: function(id, tagId, success, error) {
        var data = {
          id : id,
          tag : tagId
        };
        $http.put('/user/tags', data).success(success).error(error)
    },
    updateAmt: function(id, amt, success, error) {
        $http.put('/user/'+id+'/'+amt, data).success(success).error(error)
    }
  };
}]);
