/**
 * Created by tam on 07/11/14.
 */
function User(userid, name){
  this.userid = userid;
  this.name = name;
};

User.prototype.getUser = function() {
  return {userid: this.userid, name: this.name }
}

module.exports = User;