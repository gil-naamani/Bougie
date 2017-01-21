angular.module('Bougie')
.factory('expenseService', ['$http', function($http){

  return {
    create: function(data, success, error) {
        $http.post('/expense', data).success(success).error(error)
    },
    read: function(data, success, error) {
        $http.get('/expense', data).success(success).error(error)
    },
    update: function(data, success, error) {
        $http.put('/expense', data).success(success).error(error)
    },
    delete: function(id, success, error){
        $http.delete('/expense/'+id, data).success(success).error(error)
    }
  };
}]);
