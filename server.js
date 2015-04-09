//declare global variables to be received from client-side
var name;
var number;
var safeWord;
var strategy;

//create Servi Client to handle server-side
var servi = require('servi');
var app = new servi(true);
port(3001);
serveFiles("public");

//create new Twilio Client
var client = require('twilio')('ACfc68f8af1ef20f16fa26ed050a59e011', 'ea5bdf70ea367890e6efd2ba494ad627');

//display the homepage
route('/', showIndex);

//this route captures the user-input, which is sent from the client-side
route('/userInput', getUserData);

//this route makes the call to the user's date
route('/callDate', dial);

route('/handleData', function(request){
	var conversation = request.fields.convoData;
	console.log(conversation);
});

route('/sendData', function(req, res){
	var text = req;
	console.log("it worked: " + req);
});

//this route serves the xml file for the Twilio API to access
route('/usps', function(){
	request.serveFile('usps.xml');
});

//function called by the main route
function showIndex(){
	request.serveFile('index.html');
};

//collect all the input data from the user, sent from the client-side js
function getUserData(request){
    
	var dateData = request.fields.userData;
    var details = dateData.split(',');
    name = details[0];
    number = details[1];
    safeWord = details[2];
    strategy = details[3];
    
    console.log("Date's Name: " + name);
    console.log("Date's number: " + number);
    console.log("Your safe word: " + safeWord);
    console.log("Your strategy: " + strategy);
}

//function to handle placing the call through Twilio
function dial(){
	client.makeCall({

	//to: '+19292404478', //me
	to: '+18605733345', //seth
	from: '+12012126779', // Twilio number
	url: 'http://104.131.167.46:3001/usps.xml' // A URL that produces an XML document (TwiML) which contains instructions for the call

	}, function(err, responseData) {

	  if (err) console.log(err);
	  //executed when the call has been initiated.
	  console.log(responseData.from);
	});
};

start();