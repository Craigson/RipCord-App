// Using chrome speech API
// http://shapeshed.com/html5-speech-recognition-api/

$(document).ready(function(){

  var dateName;
  var DateNo;
  var safeWords = [];
  var exitStrats = [];
  var i = 0;

  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  //recognition.interimResults = true;
  recognition.onresult = function(event) { 
    console.log(event.results)
    var res = event.results[i][0].transcript;
    console.log(res);
    i++;
  }

$('#begin').click(function(){
  console.log("recording...");
  recognition.start(); 
  dateName = $('#name').val();
  DateNo = $('#telNo').val(); 
  console.log(dateName);
});
   
});

