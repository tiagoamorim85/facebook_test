/**
 * Created by tam on 07/11/14.
 */

var User = require('./user');

function Users(User){
  this.users = [];
}

Users.prototype.getUsers = function() {
  return this.users;
}

Users.prototype.addUser = function(User){
  this.users.push(User);
}

module.exports = Users;