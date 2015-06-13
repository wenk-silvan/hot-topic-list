htlApp.factory('Topic', function ($http) {
  return {
    create: function(topic) {
      return $http.post(apiUrl + "/topics", topic);
    },

    list: function () {
      return $http.get(apiUrl + "/topics");
    },

    read: function(id) {
      return $http.get(apiUrl + "/topics/" + id);
    },

    update: function(topic) {
      return $http.put(apiUrl + "/topics", topic);
    },

    delete: function(topic) {
      return $http.delete(apiUrl + "/topics/" + topic._id)
    },

    empty: function() {
      return {
        name: '',
        description: ''
      }
    }

  };
});
