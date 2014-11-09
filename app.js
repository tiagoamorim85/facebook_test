var facebook = require('./routes/facebook');
var files = require('./routes/files');

facebook.fetch_facebook_data( function(error, users) {
  if (error){
    console.log("Please try again later!");
    process.exit();
  } else {
    files.createSendFile(users, function(error){
    	if (error){
    		console.log("Please try again later!");
    	} else {
    			process.exit();
    	}
    });
  }
});


  //TODO: No final upload do codigo para o GitHub.
  //TODO: Ver o que fazer para o tocken to facebook nao expirar!
  //TODO: Tentar comentar o codigo!!!