htlApp.controller("TopicController", function ($scope, $http, hotkeys, ngDialog, Topic) {
  $scope.topics = [];

  $scope.newTopic = Topic.empty();

  hotkeys.add({
    combo: 'c',
    description: 'Create a new topic',
    callback: function () {
      $scope.openCreateTopicDialog()
    }
  });

  $scope.openCreateTopicDialog = function () {
    event.preventDefault();
    ngDialog.openConfirm({
      template: '/views/partial/create-topic-dialog.jade',
      className: 'ngdialog-theme-default ngdialog-wide',
      closeByDocument: false,
      closeByEscape: true,
      scope: $scope
    }).then(function () {
      Topic.create($scope.newTopic)
        .success(function (topic) {
          $scope.topics.push(topic);
          $scope.newTopic = Topic.empty();
        })
        .error(function (data, status, headers, config) {
          console.error(status, data);
        });
    });
  };

  $scope.openEditTopicDialog = function (topic) {
    event.preventDefault();
    $scope.newTopic = (JSON.parse(JSON.stringify(topic)));
    ngDialog.openConfirm({
      template: '/views/partial/create-topic-dialog.jade',
      className: 'ngdialog-theme-default ngdialog-wide',
      closeByDocument: false,
      closeByEscape: true,
      scope: $scope
    }).then(function () {
      Topic.update($scope.newTopic)
        .success(function (newTopic) {
          $scope.topics[$scope.topics.indexOf(topic)] = newTopic;
          $scope.newTopic = Topic.empty();
        })
        .error(function (data, status, headers, config) {
          console.error(status, data);
        });
    }, function (value) {
      $scope.newTopic = Topic.empty();
    });
  };

  $scope.openDeleteTopicDialog = function (topic) {
    event.preventDefault();
    ngDialog.openConfirm({
      template: '/views/partial/delete-topic-dialog.jade',
      closeByDocument: false,
      scope: $scope
    })
      .then(function () {
        Topic.delete(topic)
          .success(function () {
            $scope.topics.splice($scope.topics.indexOf(topic), 1);
          })
          .error(function (data, status, headers, config) {
            console.error(status, data);
          });
      });
  };

  Topic.list()
    .success(function (topics) {
      $scope.topics = topics;
    });
});