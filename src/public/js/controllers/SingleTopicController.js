htlApp.controller("SingleTopicController", function ($scope, $http, $routeParams, hotkeys, ngDialog, Topic) {
  Topic.read($routeParams.topicid)
    .success(function (topic) {
      $scope.topic = topic;
    });
});
