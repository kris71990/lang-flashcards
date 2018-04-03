'use strict';

var app = app || {};

(module => {
  User.currentUser = [];

  function User (username, password) {
    this.username = username;
    this.password = password;
  }

  User.loginData = (username, password) => {
    User.currentUser = new User (username, password);
    User.verifyUser(User.currentUser);
  };

  User.verifyUser = user => {
    console.log(user);
    $.get(`${__API_URL__}/api/user`, user)
      .then(results => console.log(results))
      .catch(console.error);
  };

  module.User = User;
})(app);