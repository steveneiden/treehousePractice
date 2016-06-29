var http = require('http');
var https = require('https');

function printMessage(userName, badgeCount, points) {
  var message = userName + ' has ' + badgeCount + ' badges and ' + points + ' points in JavaScript!';
  console.log(message);
}

function printError(error) {
  console.error(error.message);
}

function get(userName) {
  var request = https.get('https://teamtreehouse.com/' + userName + '.json', function(response){
    var body = "";
    response.on("data", function(chunk){
      body += chunk;
    });
    response.on("end", function(){
      if (response.statusCode === 200) {
        try {
          var profile = JSON.parse(body);
          printMessage(userName, profile.badges.length, profile.points.JavaScript);
        } catch(error) {
          printError(error);
        }
      } else {
        printError({message: "There was an error getting the profile for " + userName + ". (" + http.STATUS_CODES[response.statusCode] + ")"})
      }
    });
  });

  request.on("error", printError);
}

module.exports.get = get;
