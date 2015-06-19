var htlApp = angular.module('htlApp',
  ['ngRoute',
    'ngDialog',
    'ngSanitize',
    'cfp.hotkeys',
    'btford.markdown',
    'bootstrap-tagsinput']);

htlApp.config(['markdownConverterProvider', function (markdownConverterProvider) {
  markdownConverterProvider.config({extensions: ['github']});
}]);

var apiUrl = '/api/1.0';

htlApp.run(function ($rootScope, $location, User) {
  // checks if the view location is active
  $rootScope.isActive = function (viewLocation) {
    return $location.path().indexOf(viewLocation) > -1;
  };

  $rootScope.containsUser = function (list, user) {
    if(!list) return false;
    return list.filter(function (u) {
        return u._id == user._id;
      }).length > 0;
  };

  // navigate to the given view location
  $rootScope.go = function (viewLocation) {
    console.log(viewLocation);
    $location.path(viewLocation);
  };

  $rootScope.logout = function () {
    User.logout().success(function () {
      $rootScope.account = null;
    });
  };

  User.account()
    .success(function (data) {
      $rootScope.account = data;
    }).error(function () {
      $rootScope.account = null;
    });
});

htlApp.filter('markdown', function ($sce, $sanitize) {
  var converter = new Showdown.converter();
  return function (value) {
    value = $sanitize((value || '').replace(/\n/g, "<br\/>")).replace(/<br\/>/g, "\n");
    var html = converter.makeHtml(value);
    return $sce.trustAsHtml(html);
  };
});

htlApp.filter('plaintext', function () {
  return function (value) {
    return String(value).replace(/<[^>]+>/gm, '');
  }
});
