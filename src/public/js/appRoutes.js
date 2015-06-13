 htlApp.config(function($routeProvider) {
  $routeProvider
    .when("/?", {
      templateUrl: "views/partial/home"
    })

    .when("/login", {
      templateUrl: "views/partial/login",
      controller: "AuthenticationController"
    })

    .when("/signup", {
      templateUrl: "views/partial/signup",
      controller: "AuthenticationController"
    })

    .when("/topics", {
      templateUrl: "views/partial/topics",
      controller: "TopicController"
    })

    .when("/topics/:topicid", {
      templateUrl: "views/partial/topic",
      controller: "SingleTopicController"
    })

    .otherwise({
      redirectTo: "/"
    });
});
