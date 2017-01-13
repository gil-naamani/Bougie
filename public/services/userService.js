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
        console.log(data);
        $http.put('/user/categories', data).success(success).error(error)
    },
    removeCategory: function(id, categoryId, success, error){
      //TODO
        return
    },
    updateAmt: function(id, amt, success, error) {
        $http.put('/user/'+id+'/'+amt, data).success(success).error(error)
    }
  };
}]);
