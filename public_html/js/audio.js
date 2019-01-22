/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function beep() {
    var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU" + Array(1e3).join(123));
    snd.play();
}

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var recognition;
var speechRecognitionList;
var lastQuestionTime = Date.now();
var lastHandlingTime = Date.now();

var standbyTime = 60*1000;

var messages = new Array();
var voices;
var VOICEIDX = 0;


messages['undef'] = "Non ho capito. Prova a ripetere.";
messages['welcome'] = "Benvenuto! Ti trovi davanti al rètàblo del Presepio, e stai per toccare la tavola tàttiile che rappresenta la scena dell'adorazione. La tavola raffigura una capanna, con apertura ad arco delineata da mattoni rosso chiaro, dove sono presenti il bue e l’asinello di fronte alla mangiatoia. Nella parte alta sono raffigurati  sei angeli che reggono un festone bianco. In basso da sinistra sono raffigurati la Madonna e San Giuseppe, ai loro piedi steso  sopra un lembo del mantello della madonna il Bambino nudo con braccia aperte. Nella zona opposta sono posizionati su tre livelli i tre pastori. Puoi fare domande circa la descrizione generale del retablo, la provenienza o l'autore";
messages['pastore1'] = 'Stai esaminando il primo pastorello';//{'Stai esaminando il primo pastorello', 'Stai esaminando il primo pastore'};
messages['pastore2'] = "Stai esaminando il secondo pastorello";
//messages['pastore'] = {1:" il pastorello", 2:"Stai esaminando il pastore", 3:"Stai esaminando il custode degli ovini"};
/*
var timeout = new Date().getTime() + 15*60*1000; //add 15 minutes;
Then in your check, you're checking:

if(new Date().getTime() > timeout) {
  alert("Session has expired");
}
*/
///
var myMsg = {
    welcome: {  1: messages['welcome'], 2:'', 3:'' },
    undef: { 1: 'Non ho capito. Prova a ripetere.', 2:'Puoi cortesemente ripetere la domanda?', 3:'Non ho capito la domanda. Sto ancora ascoltando, ripeti pure.' },
    touching:{ 1: 'Stai esaminando ', 2:'Stai analizzando ', 3:'Stai esplorando' },
    re:{1: 'Ancora una volta ', 2:'Di nuovo ', 3:'Ci siamo tornati. ' },
    //shephard1: { 1: 'Il primo pastore ', 2:'Il primo pastorello ', 3:'Il primo dei pastori ', check: 0 },
    shephard2: { 1: 'Il secondo pastore ', 2:'Il pastore in secondo piano', 3:'Il secondo dei pastori ', check: 0 },
    giuseppe: { 1: 'San giuseppe ', 2:'La sagoma di San giuseppe ', 3:'la figura di san giuseppe ', check: 0 },
    madonna: { 1: 'la madonna ', 2:'la figura di maria ', 3:'la sagoma della madonna ', check: 0 }

}
///

var synth = window.speechSynthesis;

var bg;

var card;
var music = new Audio("music/Trio_Mediaeval_-_19_-_Alma_materAnte_thorum_Benedicta_es_celorum_regina_De_spineto_nata_rosa.wav");

synth.onvoiceschanged = function() {
    voices = synth.getVoices();

};


//get random integer from 1 up to 3
function getRandomArbitrary(min, max) {
  var x=Math.random() * (max - min) + min;

  if (x <=1) x = 1;
    else if (x <=2) x = 2;
      else x = 3;

  return x;
}

$(document).ready(function() {

    recognition = new SpeechRecognition();
    speechRecognitionList = new SpeechGrammarList();
    recognition.grammars = speechRecognitionList;
    //recognition.continuous = true;
    recognition.lang = 'it-IT';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
        //var synth = window.speechSynthesis;

        //evento tastiera e assegnazione a ctrlK
        var ctrlK=0;
        var active = 0;
        document.addEventListener('keydown', Tasto);

/*
        function moreInfo(text)
        {
          getResult(text);
        }
*/
        var lastX = -1;
        function Tasto(e) {

          var x = e.keyCode;
          if(x == lastX) return;
          lastX = x;

          var utterThis = new SpeechSynthesisUtterance();
          switch (x) {
            case 32
            :
              ctrlK=1;
              StartNow();
              //getResult('adorazione');

              console.log("MetaKey pressed: ", ctrlK);

              break;


              case 39
              :
              synth.cancel();
              //var utterThis = new SpeechSynthesisUtterance();
              //utterThis.stop;
              //synth.speak(utterThi);


              //utterThis.text = messages['pastore1'];
              if(myMsg['giuseppe']['check'] == 0)
                {
                  utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['giuseppe'][getRandomArbitrary(0,3)];
                  myMsg['giuseppe']['check'] = 1;//Date.now();
                }
              else
                utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['giuseppe'][getRandomArbitrary(0,3)];

              utterThis.voice = voices[VOICEIDX];
              synth.speak(utterThis);
              getResult('san giuseppe');
              //utterThis.text="vuoi ulteriori informazioni?";
              //utterThis.voice = voices[VOICEIDX];
              //synth.speak(utterThis);

              ///
              //var utterThis = new SpeechSynthesisUtterance("pastore");
              //utterThis.voice = voices[VOICEIDX];
              //synth.speak(utterThis);
              //console.log("card: ",card);
              ///
              break;
              case 37
              :
              synth.cancel();
              //var utterThis = new SpeechSynthesisUtterance();
              //utterThis.stop;
              //synth.speak(utterThi);

              if(myMsg['shephard2']['check'] == 0)
                {
                  utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['shephard2'][getRandomArbitrary(0,3)];
                  myMsg['shephard2']['check'] = 1; //Date.now();
                }
              else
                utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['shephard2'][getRandomArbitrary(0,3)];

              utterThis.voice = voices[VOICEIDX];
              synth.speak(utterThis);
              getResult('secondo pastore');

              break;

              case 38
              :
              synth.cancel();
              //var utterThis = new SpeechSynthesisUtterance();
              //utterThis.stop;
              //synth.speak(utterThi);

              if(myMsg['madonna']['check'] == 0)
                {
                  utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['madonna'][getRandomArbitrary(0,3)];
                  myMsg['madonna']['check'] = 1; //Date.now();
                }
              else
                utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['madonna'][getRandomArbitrary(0,3)];

              utterThis.voice = voices[VOICEIDX];
              synth.speak(utterThis);
              getResult('descrivi maria');

              break;

            default:
              console.log("pressione tastiera: ", window.event.keyCode);
            break;
          }
          console.log("LOGGING X: ", x);
        }
        //end

/*
        //evento mouse e assegnazione a mosueK
        document.addEventListener('onclick', Bottone);
        var mosueK=0;

        function Bottone(e) {
          var m = e.button;
          switch (m) {
            case 0:
              mosueK=1;
              console.log("MoueButton pressed: ", mosueK);

              break;

            default:
              console.log("pressione tastiera: ", window.event.keyCode);
            break;
          }
          console.log("LOGGING X: ", m);
        }
        //end
*/



////        var controllerOptions = {enableGestures:true};
        //var active = 0;



///////////////////////////////////////
///////////////////////////////////////

///////////////////////////////////////
///////////////////////////////////////


        //START
        function StartNow(){
          var now = Date.now();
          if((now - lastQuestionTime  > standbyTime ) && (now - lastHandlingTime  > standbyTime)) active = 0;
          console.log("** ctrlK **", ctrlK);//if ((frame.hands.length > 0){}

          if (ctrlK==1){
              lastHandlingTime = Date.now();
              if (active == 0){
                  music.play();

/*
synth.cancel();
$(music).animate({volume: 0.1}, 1000);
lastQuestionTime =  Date.now();
getResult($("#question").val());
*/
                  $(".painting").fadeTo(5000,1);
                  setTimeout(function(){
                      //synth.cancel();
                      $(music).animate({volume: 0.1}, 1000);


                      //scrittura su schermo(?)
                      $("#answer").hide();
                      $("#answer").stop();
                      $("#answer").fadeIn({duration:$(document).height()/2, queue:false});
                      $("#answer").html(messages['welcome']);
                      //console.log($(document).height())
                      $("#answer").css({ top: $(document).height()/2});
                      //

                      //
                      var len = messages['welcome'].length;
                      var perc = (len/100)*10;
                      $("#answer").animate({top: - ($(document).height()/2), queue:false},   3000*len/perc);

                      console.log("ANSWER LENGTH: ", len);
                      console.log("VALUE X length: ",perc);

                      var utterThis = new SpeechSynthesisUtterance();
                      utterThis.text = messages['welcome'];
                      utterThis.voice = voices[VOICEIDX];

                      utterThis.onend = function (event) {
                          console.log("end");
                          $(music).animate({volume: 1}, 1000);
                          //recognition.start();
                      }
                      synth.speak(utterThis);

                  }, 5000);





                  active = 1;
              }
              //controller.disconnect();

              /*
              if(frame.hands.length<0)
              {
              console.log("palmposition", frame.hands[0].palmPosition);
              var interactionBox = frame.interactionBox;
              var normalizedPosition = interactionBox.normalizePoint(frame.hands[0].palmPosition, true);
              }
              */

              //console.log("normalizedPosition", normalizedPosition);
          }

        }
        //stop
/*
        var controller = Leap.loop(controllerOptions, function(frame) {

            //console.log("frame hands length", frame.hands.length);
            var now = Date.now();
            if((now - lastQuestionTime  > standbyTime ) && (now - lastHandlingTime  > standbyTime)) active = 0;

            //if ((frame.hands.length <= 0)&&active == 0){music.play();console.log("palmposition <= 0")}
            //window.event.keyCode;
            console.log("** ctrlK **", ctrlK);//if ((frame.hands.length > 0){}

            if ((frame.hands.length > 0)||(ctrlK==1)){
                lastHandlingTime = Date.now();
                if (active == 0){
                    music.play();
                    $(".painting").fadeTo(5000,1);
                    setTimeout(function(){
                        $(music).animate({volume: 0.1}, 1000);
                        var utterThis = new SpeechSynthesisUtterance();
                        utterThis.text = messages[1];
                        utterThis.voice = voices[VOICEIDX];

                        utterThis.onend = function (event) {
                            console.log("end");
                            $(music).animate({volume: 1}, 1000);
                            //recognition.start();
                        }
                        synth.speak(utterThis);

                    }, 5000);





                    active = 1;
                }
                //controller.disconnect();

                if(frame.hands.length<0)
                {
                console.log("palmposition", frame.hands[0].palmPosition);
                var interactionBox = frame.interactionBox;
                var normalizedPosition = interactionBox.normalizePoint(frame.hands[0].palmPosition, true);
                }
                //console.log("normalizedPosition", normalizedPosition);
            }


        })
        //FINE function frame
*/

/*
        controller.on('gesture', onGesture);
        function onGesture(gesture,frame){
            console.log(gesture.type + " with ID " + gesture.id + " in frame " + frame.id);
        }
*/



    var client = new $.es.Client({
        hosts: 'localhost:9200'
    });

    var bg = document.querySelector('html');

    var card = "";
    var askedNames =  new Array();






    // Handler for .ready() called.

    $(".card").on("click", function() {
        card = $(this).attr("id");
        $("#answer").html(card);
        beep();
        synth.cancel();
        $(music).animate({volume: 0.1}, 1000);
        if(active == 1)
        recognition.start();
        //voices = synth.getVoices();
        lastQuestionTime =  Date.now();
        //StartNow();//controller.connect();

    });
    $(".card").on("mouseenter", function() {
        if (card === $(this).attr("id"))
            return;
        card = $(this).attr("id");


        var utterThis = new SpeechSynthesisUtterance(card);
        utterThis.voice = voices[VOICEIDX];
        synth.speak(utterThis);
    });

    $("#question").keypress(function(e) {
    if(e.which == 13) {
        synth.cancel();
        $(music).animate({volume: 0.1}, 1000);
        lastQuestionTime =  Date.now();
        getResult($("#question").val());
        console.log("e.which =13!!!!!!!");
    }


});



    recognition.onresult = function(event) {
        var last = event.results.length - 1;
        var text = event.results[last][0].transcript;
        $("#question").val(text)
        getResult(text)
    }
    function getResult(text){
        var query = "question:" + text + " AND title:" + card

        console.log("query: ", query);
        console.log('Confidence: ' + text);
        client.search({
            index: 'myindex',
            //analyzer: 'my_synonyms',
            //q: query
            body: {
                query: {
                    bool: {
                        must: [
                            {
                                bool: {
                                    should: [
                                        {match: {question: {query: text, boost: 2}}},
                                        {match: {answer: text}}

                                    ]
                                }
                            },
                            {
                                bool: {
                                    should: [
                                        {match: {title: "Pinacoteca"}},
                                        {match: {title: card}}

                                    ]
                                }
                            }
                        ]
                    }
                }
            }
        }, function(error, response) {
            console.log("resp:", response);
            if (response.hits.total > 0) {
                //var answer = response.hits.hits[0]._source.answer;
                var suggests = response.hits.hits[0]._source.suggests;

                var toSynthText = response.hits.hits[0]._source.answer;//+" Testo aggiunto.";
                console.log("toSynthText: ",toSynthText);
                console.log("suggests: ",suggests[0]["linkedName"]);
              //  console.log("askedNamesss", askedNames);



                for (i in suggests)
                {

                  if(askedNames[ suggests[i]["linkedName"] ]!=undefined)
                    console.log("**** AskedNames in suggest cile", askedNames[ suggests[i]["linkedName"] ]);

                  if(askedNames[ suggests[i]["linkedName"] ]==undefined)
                  {
                    if(c==undefined) var c = true;
                    if(c==true) {toSynthText+= " Puoi chiedere "; c=false; }
                    else toSynthText+= " oppure ";

                    toSynthText+= " "+suggests[i]["suggest"];
                  }

                  console.log("Nel for toSynthText:", toSynthText);

                }
                var answer = toSynthText;


                //scrittura su schermo(?)
                $("#answer").hide();
                $("#answer").stop();
                $("#answer").fadeIn({duration:$(document).height()/2, queue:false});
                $("#answer").html(answer);
                //console.log($(document).height())
                $("#answer").css({ top: $(document).height()/2});
                var len = answer.length;
                var perc = (len/100)*10;
                $("#answer").animate({top: -($(document).height()*0.45), queue:false},   3000*len/perc);

                console.log("ANSWER LENGTH: ", len);
                console.log("VALUE X length: ",perc);

                $.post('log.php', {
                    answer:answer,
                    question: text,
                    card: card
                });

                console.log("console all qa:", response.hits.hits[0]);

                var name = response.hits.hits[0]._source.name;
                if(askedNames[name]==undefined)
                  askedNames[name] = 1;
                else
                  askedNames[name] ++;

                  console.log("askedNames", askedNames);

                var utterThis = new SpeechSynthesisUtterance(toSynthText);
                //SpeechSynthesisUtterance.text += " . Aggiunto un testo finale.";

                utterThis.voice = voices[VOICEIDX];

                utterThis.onend = function (event) {
                            $(music).animate({volume: 1}, 1000);
                            //recognition.start();

                                //}
                }

                synth.speak(utterThis);



                if (response.hits.hits[0]._source.link != undefined) {
                   // card = response.hits.hits[0]._source.link;
                    console.log(response.hits.hits[0]._source.link)
                }
            } else {
                var utterThis = new SpeechSynthesisUtterance(messages['undef']);
                utterThis.voice = voices[VOICEIDX];
                utterThis.onend = function (event) {
                            $(music).animate({volume: 1}, 1000);
                        }
                synth.speak(utterThis);

                /*
                utterThis.onend = function(event) {
                    console.log("utterThis.onend");
                    recognition.start();
                }*/

            }

        });




    }

    recognition.onspeechend = function() {
        recognition.stop();
    }

    recognition.onnomatch = function(event) {
        console.log('I didnt recognise that color.');
    }

    recognition.onerror = function(event) {
        console.log('Error occurred in recognition: ' + event.error);
        /*
        utterThis.text = "Non ho riconosciuto nessuna domanda. Se vuoi riformulare fai un click.";
        utterThis.voice = voices[VOICEIDX];
        synth.speak(utterThis);
        */
    }

});

/*

case 38
:
synth.cancel();
//var utterThis = new SpeechSynthesisUtterance();
//utterThis.stop;
//synth.speak(utterThi);

if(myMsg['madonna']['check'] == 0)
  {
    utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['madonna'][getRandomArbitrary(0,3)];
    myMsg['madonna']['check'] = 1; //Date.now();
  }
else
  utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['madonna'][getRandomArbitrary(0,3)];

utterThis.voice = voices[VOICEIDX];
synth.speak(utterThis);
getResult('madonna');

break;

*/
