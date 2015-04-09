//declare global variables to be received from client-side
var name;
var number;
var safeWord;
var strategy;

var message = "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n<Response> \n<Say> \nThis is an automated message intended for [insert name], from the United States Postal Service.  If you are not [insert name], please press one or hang up now.There is a delivery marked \"valuable and fragile\" waiting for you at your residential address.You are receiving this message as there is currently nobody at the specified delivery address.The USPS agent has been instructed to wait for approximately forty-five minutes. If you are not there to receive the package in person, USPS cannot guarantee the safe delivery of your package. Good bye. \n</Say> \n</Response>";

//create Servi Client to handle server-side
var servi = require('servi');
var app = new servi(true);
port(3001);
serveFiles("public");

//create new Twilio Client
var client = require('twilio')('ACfc68f8af1ef20f16fa26ed050a59e011', 'ea5bdf70ea367890e6efd2ba494ad627');

//display the homepage
route('/', function(){
	request.serveFile('index.html');
});

//this route captures the user-input data, which is sent from the client-side
route('/userInput', function (request){
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
});

//this route creates the custom xml doc for the Twilio voice to read
route('/createMessage', function (response) {
	var customMessage = message.replace("[insert name]", name);
	response.header('text/xml');
	response.respond(customMessage);
});

//this route makes the call to the user's date
route('/callDate', dial);

//function to handle placing the call through Twilio
function dial(){
	client.makeCall({
	to: number, //the number entered by the user on the client-side
	from: '+12012126779', // Twilio number
	url: 'http://104.131.167.46:3001/createMessage' //points to the route that generates the xml

	}, function(err, responseData) {

	  if (err) console.log(err);
	  //executed when the call has been initiated.
	  console.log(responseData.from);
	  console.log(number);
	});
};

start();