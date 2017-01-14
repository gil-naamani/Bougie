Bougie.controller('globalController', ['$scope', '$rootScope', '$location', '$localStorage','authService', 'userService', 'modalService',
    function($scope, $rootScope, $location, $localStorage, authService, userService, modalService){

  $rootScope.token = $localStorage.token || null;
  $rootScope.user = setNullUser();

  $scope.init = function(){

    if ($rootScope.token){
      userService.read(authService.getCurrentUser(), function(res){
        $rootScope.user = res.data;
        console.log($rootScope.user);
      }, function(err) {
        console.log(err);
        $rootScope.user = setNullUser();
      })
    };
  };

  $scope.openLoginModal =function() {
    modalService.openLoginModal();
  }

  $scope.signOut = function() {
    authService.signout(function() {
        $location.path("/");
    }, function() {
        alert("Failed to logout!");
    });
    $rootScope.user = setNullUser();
    $rootScope.token = null;
  };

  function setNullUser() {
    return {
      username : authService.getCurrentUser(),
      _id : undefined,
      id : undefined,
      categories : [],
      tags : [],
      expenses : [],
      amt : 0
    };
  };
}]);
