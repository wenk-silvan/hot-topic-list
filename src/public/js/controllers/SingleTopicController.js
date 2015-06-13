htlApp.controller("SingleTopicController", function ($scope, $http, $routeParams, hotkeys, ngDialog, Topic, User) {
  Topic.read($routeParams.topicid)
    .success(function (topic) {
      $scope.topic = topic;
    });

  $scope.queryUsers = function(query) {
    return User.find(query);
  };

  $scope.nameOf = function(item) {
    return item.firstname.concat(' ', item.lastname);
  }
});
