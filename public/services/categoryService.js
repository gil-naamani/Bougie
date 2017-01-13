angular.module('Bougie')
.factory('categoryService', ['$http', function($http){

  return {
    create: function(data, success, error) {
        $http.post('/category', data).success(success).error(error)
    },
    read: function(data, success, error) {
        $http.get('/category', data).success(success).error(error)
    },
    update: function(data, success, error) {
        $http.put('/category', data).success(success).error(error)
    },
    delete: function(id, success, error){
        $http.delete('/category/'+id).success(success).error(error)
    }
  };
}]);
