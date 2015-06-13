htlApp.controller("SingleTopicController", function ($scope, $http, $routeParams, hotkeys, ngDialog, Topic, User) {
  Topic.read($routeParams.topicid)
    .success(function (topic) {
      $scope.topic = topic;
    });

  $scope.queryUsers = function(query) {
    return User.find(query);
  };

  $scope.nameOf = function(item) {
    if(!!item.firstname && !!item.lastname)
      return item.firstname.concat(' ', item.lastname);
    return item.local.username;
  }
});
