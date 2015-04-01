// Using chrome speech API
// http://shapeshed.com/html5-speech-recognition-api/
$(document).ready(function(){

$('listening').hide();

  var dateName;
  var dateNo;
  var safeWord;
  var exitStrat;
  var i = 0;

  var recognition = new webkitSpeechRecognition();

  recognition.continuous = true;
  
  recognition.onresult = function(event) { 
    console.log(event.results)

    var res = event.results[i][0].transcript;
    console.log(res);
    console.log(safeWord);
    if (res.indexOf(safeWord) !== -1){
      console.log("safeword identified.  Making Call");
      $.post('/callDate');
      };
    i++;
  };


$('#begin').click(function(){
  console.log("recording...");

  var thisInfo = ''; //create an empty string that user input can be added to
  var userData; //variable for storing the user's data for the httpPost

  recognition.start(); //start speech recognition

  dateName = $('#name').val();
  dateNo = $('#telNo').val();
  safeWord = $('#word').val();
  exitStrat = $('#strategy').val();

//concatenate the data into a string to send to the server
  thisInfo += dateName;
  thisInfo += ',';
  thisInfo += dateNo;
  thisInfo += ',';
  thisInfo += safeWord;
  thisInfo += ',';
  thisInfo += exitStrat;

  //console.log(thisInfo);

  $('#wrapper').hide(10);
  $('#listening').css({'display':'block'});

//send the data to the server by calling the /userInput route
  $.post('/userInput', {userData: thisInfo}, function(){
    console.log("success sending user input data");
  });

}); // end of click
   
});

//save the name, number, safeword and exit strategy
//send these to the server
//add details to twilio app
//listen for the safeword
//when the safeword is heard, contact the server
//server initiates call
