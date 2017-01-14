angular.module('Bougie')
.factory('tagService', ['$http', function($http){

  return {
    create: function(data, success, error) {
        $http.post('/tag', data).success(success).error(error)
    },
    read: function(data, success, error) {
        $http.get('/tag', data).success(success).error(error)
    },
    update: function(data, success, error) {
        $http.put('/tag', data).success(success).error(error)
    },
    delete: function(id, success, error){
        $http.delete('/tag/'+id).success(success).error(error)
    }
  };
}]);
