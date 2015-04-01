//declare global variables
var name;
var number;
var safeWord;
var strategy;

// npm install twilio
var twilio = require('twilio');

// npm install express
// setup express app
var express = require('express');
var app = express();
app.set('port', process.env.PORT || 3001);
var server = require('http').Server(app);
server.listen(app.get('port'));

app.use(express.static('public'));

//create a new twilio client
var client = require('twilio')('ACfc68f8af1ef20f16fa26ed050a59e011', 'ea5bdf70ea367890e6efd2ba494ad627');


//setup routes

//this route captures the user-input
app.get('/userInput', function(req, res){
	
	var dateData = req.fields.userData;
    var details = dateData.split(',');
    name = details[0];
    number = details[1];
    safeWord = details[2];
    strategy = details[3];
    
    console.log(name);
    console.log(number);
    console.log(safeWord);
});
	

app.get('/', function(req, res){
	res.sendFile('index.html');
});

app.get('/lottery', function(req, res){
	res.sendFile('lottery.xml');
});



//this route makes the call to the user's date
app.get('/callDate', dial);

function getUserData(request){
    
  console.log(strategy);
}


function dial(){
//Place a phone call, and respond with TwiML instructions from the given URL
	client.makeCall({

	to: '+1' + number, // Any number Twilio can call
	from: '+12012126779', // A number you bought from Twilio and can use for outbound communication
	url: 'http://104.131.167.46:3001/lottery.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call

	}, function(err, responseData) {

	  if (err) console.log(err);
	  //executed when the call has been initiated.
	  console.log(responseData.from);
	});
};