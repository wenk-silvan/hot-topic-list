htlApp.factory('User', function ($http) {
  var account;

  return {
    /**
     * Try's a login of a given user. Use the HttpPromises <c>success</c> and <c>error</c> for result handling.
     * @param username The username
     * @param password The password of the user
     * @returns {HttpPromise}
     */
    login: function (username, password) {
      return $http.post(apiUrl + "/authentication/login", {username: username, password: password});
    },

    logout: function() {
      return $http.get(apiUrl + "/authentication/logout");
    },

    find: function(query) {
      return $http.get(apiUrl + "/user/find/" + encodeURIComponent(query));
    },

    /**
     * Try's a signup of a given user. Use the HttpPromises <c>success</c> and <c>error</c> for result handling.
     * @param user The user to singup
     * @returns {HttpPromise}
     */
    signup: function (user) {
      return $http.post(apiUrl + "/authentication/signup", user);
    },

    account: function () {
      return $http.get(apiUrl + "/authentication/account");
    }
  };
});
