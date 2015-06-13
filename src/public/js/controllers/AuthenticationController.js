htlApp.controller("AuthenticationController", function ($scope, $rootScope, $location, User) {

  $scope.errors = {
    username: '',
    password: ''
  };

  $scope.credentials = {
    username: '',
    password: ''
  };

  $scope.userdata = {
    username: '',
    password: ''
  };

  $scope.login = function () {
    User.login($scope.credentials.username, $scope.credentials.password)
      .success(function (data) {
        $rootScope.account = data;
        $location.path("/topics");
      })
      .error(function (data, status, headers, config) {
        $scope.errors = data;
        $scope.credentials.password = '';
      });
  };

  $scope.signup = function () {
    User.signup($scope.userdata)
      .success(function (data) {
        $location.path("/topics");
      })
      .error(function (data, status, headers, config) {
        $scope.errors = data;
      });
  };
});
