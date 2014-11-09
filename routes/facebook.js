var async = require('async');
var FB = require('fb');

var User = require('./user');
var Users = require('./users');

var settings = require('../settings');

exports.fetch_facebook_data = function (callbackf){
  //Fetch data from facebook
  console.log("Fetching data from facebook!");
  FB.setAccessToken(settings.facebook_token);
  var i = 1;
  var users = new Users();
  async.whilst(
    function () {
      return i <= settings.number_users;
    },
    function (callback) {
      FB.napi({ method: 'users.getInfo', uids: [i.toString()], fields: ['uid', 'name'] }, function (error, res) {
        if(error) {
          callback(error);
        } else if (res.length > 0) {
          var user = new User(res[0].uid, res[0].name);
          console.log(user);
          users.addUser(user);
        }
        i++;
        callback();
      });
    },
    function (error) {
      if (error){
        console.log(error);
        callbackf(error, null);
      } else {
        console.log("Data fetched!");
        callbackf(null, users);
      }
    }
  );
}