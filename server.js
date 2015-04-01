//declare global variables
var name;
var number;
var safeWord;
var strategy;

var servi = require('servi');
var app = new servi(true);

//create new Twilio Client
var client = require('twilio')('ACfc68f8af1ef20f16fa26ed050a59e011', 'ea5bdf70ea367890e6efd2ba494ad627');

port(3001);

serveFiles("public");

route('/', showIndex);

route('/lottery', function(){
	request.serveFile('lottery.xml');
});

//this route captures the user-input
route('/userInput', getUserData);

//this route makes the call to the user's date
route('/callDate', dial);

//collect all the input data from the user, sent from the client-side js
function getUserData(request){
    
	var dateData = request.fields.userData;
    var details = dateData.split(',');
    name = details[0];
    number = details[1];
    safeWord = details[2];
    strategy = details[3];
    
    console.log(name);
    console.log(number);
    console.log(safeWord);
    console.log(strategy);
}

//this function shows the homepage
function showIndex(){
	request.serveFile('index.html');
};

start();


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