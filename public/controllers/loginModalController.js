Bougie.controller('loginModalController', ['$rootScope', '$scope', '$location', '$localStorage', 'authService', '$uibModalInstance',
    function($rootScope, $scope, $location, $localStorage, authService, $uibModalInstance){

  $scope.usrObj = {
    username : null,
    password : null,
    newUsername : null,
    newPassword : null,
    repeatPassword : null,
    amt : null
  };

  $scope.setUserToken = function(user, token){
    $rootScope.token = token;
    $rootScope.user['username'] = user.username;
    $rootScope.user['id'] = user._id;
    $rootScope.user['_id'] = user._id;
    $rootScope.user['categories'] = user.categories;
    $rootScope.user['amt'] = user.amt;
  };

  $scope.signIn = function() {
    var formData = {
        username: $scope.usrObj.username,
        password: $scope.usrObj.password
    };

    authService.signin(formData, function(res) {
         if (res.type == false) {
             alert(res.data)
         } else {
             console.log(res.data);
             $localStorage.token = res.data.token;
             $scope.setUserToken(res.data, $localStorage.token);
             $location.path("budget");
         }
     }, function() {
         $rootScope.error = 'Failed to signin';
     });
    $uibModalInstance.close();
  };

  $scope.signUp = function() {
     var formData = {
         username: $scope.usrObj.newUsername,
         password: $scope.usrObj.newPassword,
         amt: $scope.usrObj.amt
     };

     authService.signup(formData, function(res) {
         if (res.type == false) {
             alert(res.data)
         } else {
             $localStorage.token = res.data.token;
             $scope.setUserToken(res.data, $localStorage.token);
             $location.path("budget");
         }
     }, function() {
         $rootScope.error = 'Failed to signup';
     });
     $uibModalInstance.close();
  };

  $scope.cancel = function() {
    $uibModalInstance.close();
  }
  $scope.verifyRepeat = function(){
    if ($scope.usrObj.newPassword == null || $scope.usrObj.newPassword == ""){
      return false;
    }
    if ($scope.usrObj.newPassword !== $scope.usrObj.repeatPassword){
      return false;
    }
    return true;
  };

}]);
