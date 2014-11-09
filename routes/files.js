/**
 * Created by tam on 07/11/14.
 */
var csv = require("fast-csv");
var async = require('async');
var client = require('ftp');
var fs = require('fs');

var settings = require('../settings');

exports.createSendFile = function(Users, callback){
  createCSVFile(Users, function(error){
    if (error){
      console.log(error);
      callback(error);
    } else {
      files.sendFilesToServer(function(error){
        if (error){
          console.log(error); 
          callback(error);         
        } else {
         callback(null);
        }
      });
    }
  });
};

//Create CSV file
function createCSVFile(Users, f_callback){
  var csvStream = csv.createWriteStream({headers: false}),
    writableStream = fs.createWriteStream(settings.file_name);
  csvStream.pipe(writableStream);
  async.eachSeries(Users.getUsers(), function(user, callback){
    csvStream.write(user.getUser());
    callback();
  },
  function(error){
    csvStream.end();
    writableStream.on("finish", function(){
      console.log("File created!");
      f_callback(null);
    });

  });
};

//Send CSV file to server
function sendFilesToServer(callback) {
  var c = new client();
  c.on('ready', function() {
    c.put(settings.file_name, settings.file_name, function(error) {
      if (error) {
        callback(error);
      } else {
        c.end();
        callback(null);
      }
    });
  });
  c.connect(settings.ftp_options);
};

