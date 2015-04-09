// Using chrome speech API and Twillio

$(document).ready(function(){
  $('#wrapper').hide(); //hide the main screen
  $('#listening').hide(); //hide the active listening screen

  //variables to store data input by the user
  var dateName;
  var dateNo;
  var safeWord;
  var exitStrat;
  var i = 0;
  
  //a new speech recognition object
  var recognition = new webkitSpeechRecognition();

  //recogintion is continuous
  recognition.continuous = true;
  //recognition.interimResults = true;
    
  recognition.onresult = function(event) { 
    console.log(event.results)

    var res = event.results[i][0].transcript;
    console.log(res);

    //if the safeword is present in the body of text captured by the speech recognition object
    //send a request to the server's /callDate route that initiates the Twilio call
    if (res.indexOf(safeWord) !== -1){
      $.post('/callDate');
      console.log("safeword identified.  Making Call");
    };
    i++;
  };

  //when the user clicks on the welcome screen, the welcome screen is hidden and the main
  //page is displayed
  $('html').click(function(){
    $('#welcome').hide(10);
    $('#wrapper').css({'display':'inline-block'});
  });

  //
  $('#begin').click(function(){
      recognition.start(); //start speech recognition
      console.log("listening...");

      var thisInfo = ''; //create an empty string that user input can be added to
      var userData; //variable for storing the user's data for the httpPost

      //assign the values input by the user to the global variables
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

      //hide the main page when the 'Start' button is pressed
      $('#wrapper').hide(10);

      //display the page that tells the user the app is listening
      $('#listening').css({'display':'block'});

    //send the data input by the user to the server by calling the /userInput route
      $.post('/userInput', {userData: thisInfo}, function(){
        console.log("success sending user input data");
      });

  }); // end of click
     
}); //end of on-ready


