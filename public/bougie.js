var dependencies = [
  'ngStorage',
  'ngRoute',
  'ui.bootstrap',
  'angular-jwt',
  'ui.calendar',
  'ngAnimate',
  'nvd3']

var Bougie = angular.module('Bougie', dependencies);

Bougie.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

  // contorl the routing of partial pages
  $routeProvider.when('/', {
    controller : 'homeController',
    templateUrl : '/views/home.html',
    title : 'Bougie Home'
  }).when('/login', {
    controller : 'loginController',
    templateUrl : '/views/login.html',
    title: 'Login'
  }).when('/schedule', {
    controller : 'scheduleController',
    templateUrl : '/views/schedule.html',
    title: 'Login',
    resolve: {loggedIn:isValidTokenAndUser}
  }).when('/budget', {
    controller : 'budgetController',
    templateUrl : '/views/budget.html',
    title: 'Budget',
    resolve: {loggedIn:isValidTokenAndUser}
  }).otherwise({
    redirectTo : '/'
  });

  // place token inside Authorization header of every request
  $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
    return {
        'request': function (config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        'responseError': function(response) {
            if(response.status === 401 || response.status === 403) {
                $location.path('/login');
            }
            return $q.reject(response);
        }
    };
    }]);
}]);

var isValidTokenAndUser = function ($location, $q, authService) {
    var deferred = $q.defer();
    var promise = authService.isAuthenticated();
    var isValid;
    if (promise){
      promise.then(function(res){
        isValid = res.data.type;
        if (isValid){
          deferred.resolve();
        } else {
          deferred.reject();
          $location.url('/login');
        }
      });
    } else {
      deferred.reject();
      $location.url('/login');
    };
    return deferred.promise;
};
