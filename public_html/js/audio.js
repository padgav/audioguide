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
var focusElem = false;

messages['undef'] = "Non ho capito. Prova a ripetere.";
messages['welcome'] = "Benvenuto! Ti trovi davanti al rètàblo del Presepio, e stai per toccare la tavola tàttiile che rappresenta la scena dell'adorazione. La tavola raffigura una capanna, con apertura ad arco delineata da mattoni rosso chiaro, dove sono presenti il bue e l’asinello di fronte alla mangiatoia. Nella parte alta sono raffigurati  sei angeli che reggono un festone bianco. In basso da sinistra sono raffigurati la Madonna e San Giuseppe, ai loro piedi steso  sopra un lembo del mantello della madonna il Bambino nudo con braccia aperte. Nella zona opposta sono posizionati su tre livelli i tre pastori. Puoi fare domande circa la descrizione generale del retablo, la provenienza o l'autore";
messages['welcome2'] = "Benvenuto! Ti trovi davanti al quadro dell'Annunciazione: stai per toccare la tavola tàttiile dell'opera e puoi liberamente fare domande sul quadro."
messages['welcome3'] = "Benvenuto! Ti trovi davanti al quadro della Crocefissione: stai per toccare la tavola tàttiile dell'opera e puoi liberamente fare domande sul quadro."
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
    welcome: {  1: messages['welcome'], 2:messages['welcome2'], 3:messages['welcome3'] },
    undef: { 1: 'Non ho capito. Prova a ripetere.', 2:'Puoi cortesemente riformulare la domanda?', 3:'Non ho capito. Riformula la domanda.' },
    touching:{ 1: 'Stai esaminando ', 2:'Stai analizzando ', 3:'Stai esplorando' },
    re:{1: 'Ancora una volta ', 2:'Di nuovo ', 3:'Ci siamo tornati. ' },
    //shephard1: { 1: 'Il primo pastore ', 2:'Il primo pastorello ', 3:'Il primo dei pastori ', check: 0 },
    hut: { 1: 'La capanna', 2:'Il pastore in primo piano', 3:'La capanna', check: 0 }, //s 83
    baby: { 1: 'Il bambino', 2:'Il bambinello', 3:'Gesù bambino', check: 0 }, //f 70
    angels: { 1: 'Gli angeli', 2:'Gli angeli che reggono un festone', 3:'Gli angeli posti nella parte alta della capanna', check: 0 },//a 65
    dog: { 1: 'Il cane', 2:'Il cane dei pastori', 3:'Il cane', check: 0 }, //d 68
    shephard1: { 1: 'Il primo pastore ', 2:'Il pastore in primo piano', 3:'Il primo dei pastori ', check: 0 }, //darrow 40
    shephard2: { 1: 'Il secondo pastore ', 2:'Il pastore in secondo piano', 3:'Il secondo dei pastori ', check: 0 }, //larrow 37
    shephard3: { 1: 'Il terzo pastore ', 2:'Il pastore in terzo piano', 3:'Il terzo dei pastori ', check: 0 }, // w 87
    giuseppe: { 1: 'San giuseppe ', 2:'La sagoma di San giuseppe ', 3:'la figura di san giuseppe ', check: 0 }, // rarrow 39
    madonna: { 1: 'la madonna ', 2:'la figura di maria ', 3:'la sagoma della madonna ', check: 0 }, // uparrow  38
    which: {1: 'Quale quadro vuoi esplorare?', check: 0}

}
var myMcoms = {
    moff: ["spegni la musica"],
    mon: ["accendi la musica"],
    mdown: ["abbassa la musica"],
    mup: ["solleva la musica"],
    restart: ["ricomincia"],
    restart2: ["ricomincia da capo"],
    change: ["cambia quadro"]


}
var myPaints = {
      1: {name: "Adorazione", src: "http://3.bp.blogspot.com/-PWuqYUHJqME/Vl_6TrGcPzI/AAAAAAAACWE/DywzGXjIr8c/s1600/sar2.jpg"},
      2: {name: "Annunciazione", src: "http://www.pinacoteca.cagliari.beniculturali.it/getImage.php?id=43&w=640&h=480&force=false"},
      3: {name: "Crocefissione", src: "http://www.pinacoteca.cagliari.beniculturali.it/getImage.php?id=44&w=640&h=480&force=false"},
      4: {name: "Crocifissione", src: "http://www.pinacoteca.cagliari.beniculturali.it/getImage.php?id=44&w=640&h=480&force=false"}
    }
//quadri = {1: "Adorazione", 2: "Annunciazione", 3: "Crocefissione"}
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
        //document.getElementById("question").addEventListener('keydown', Tasto);
        document.addEventListener('keydown', Tasto);
        //focusElem

/*
        function moreInfo(text)
        {
          getResult(text);
        }
*/
        var lastX = -1;
        var currWelcome = "";
        function Tasto(e) {

          var x = e.keyCode;
          if(x == lastX) return;
          lastX = x;

          var utterThis = new SpeechSynthesisUtterance();
          switch (x) {
            case 32:
              ctrlK=1;
              StartNow();
              //getResult('adorazione');

              console.log("MetaKey pressed: ", ctrlK);

              break;




            default:
              console.log("pressione tastiera: ", window.event.keyCode);
            break;
          }
          console.log("LOGGING X: ", x);


          if(focusElem!=true) //wasdfg
                              //w 87 a 65 s 83 d 68 f 70 g 71
          switch (x) {

          case 37: //larrow

          if($(".card").attr("id") == myPaints[1]["name"].toString())
          {
          synth.cancel();
          //var utterThis = new SpeechSynthesisUtterance();
          //utterThis.stop;
          //synth.speak(utterThi);

          if(myMsg['shephard2']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['shephard2'][getRandomArbitrary(0,3)];
              myMsg['shephard2']['check'] = 1; //Date.now();
              writeSubject(myMsg['shephard2'][1]); fixTxt();
            }
          else
          {
            utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['shephard2'][getRandomArbitrary(0,3)];
            writeSubject(myMsg['shephard2'][1]); fixTxt();
          }
          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult('secondo pastore');
          }
          break;

          case 38: // uparrow
          if($(".card").attr("id") ==  myPaints[1]["name"].toString())
          {
          synth.cancel();

          if(myMsg['madonna']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['madonna'][getRandomArbitrary(0,3)];
              myMsg['madonna']['check'] = 1; //Date.now();
              writeSubject(myMsg['madonna'][1]); fixTxt();
            }
          else
            {
              utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['madonna'][getRandomArbitrary(0,3)];
              writeSubject(myMsg['madonna'][1]); fixTxt();
            }

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult('descrivi maria');
          }
          break;

          case 39: // rarrow
          //console.log("Cosa contiene card.attr(id): ", $(".card").attr("id"));
          if($(".card").attr("id") == myPaints[1]["name"].toString())
          {
          synth.cancel();

          //utterThis.text = messages['pastore1'];
          if(myMsg['giuseppe']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['giuseppe'][getRandomArbitrary(0,3)];
              myMsg['giuseppe']['check'] = 1;//Date.now();
              writeSubject(myMsg['giuseppe'][1]); fixTxt();
            }
          else
          {
            utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['giuseppe'][getRandomArbitrary(0,3)];
            writeSubject(myMsg['giuseppe'][1]); fixTxt();
          }
          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult('san giuseppe');
          }
          break;

          case 40: //darrow
          if($(".card").attr("id") == myPaints[1]["name"].toString())
          {
          synth.cancel();
          //var utterThis = new SpeechSynthesisUtterance();
          //utterThis.stop;
          //synth.speak(utterThi);

          if(myMsg['shephard1']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['shephard1'][getRandomArbitrary(0,3)];
              myMsg['shephard1']['check'] = 1; //Date.now();
              writeSubject(myMsg['shephard1'][1]); fixTxt();
            }
          else
          {
            utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['shephard1'][getRandomArbitrary(0,3)];
            writeSubject(myMsg['shephard1'][1]); fixTxt();
          }
          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult( myMsg['shephard1'][1]);
          }
          break;

          case 87: // w 87
          if($(".card").attr("id") == myPaints[1]["name"].toString())
          {
          synth.cancel();
          //var utterThis = new SpeechSynthesisUtterance();
          //utterThis.stop;
          //synth.speak(utterThi);

          if(myMsg['shephard3']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['shephard3'][getRandomArbitrary(0,3)];
              myMsg['shephard3']['check'] = 1; //Date.now
              writeSubject(myMsg['shephard3'][1]); fixTxt();
            }
          else
          {
            utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['shephard3'][getRandomArbitrary(0,3)];
            writeSubject(myMsg['shephard3'][1]); fixTxt();
          }
          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult( myMsg['shephard3'][1]);
          }
          break;

          case 65: //a 65
          if($(".card").attr("id") == myPaints[1]["name"].toString())
          {
          synth.cancel();
          //var utterThis = new SpeechSynthesisUtterance();
          //utterThis.stop;
          //synth.speak(utterThi);

          if(myMsg['angels']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['angels'][getRandomArbitrary(0,3)];
              myMsg['angels']['check'] = 1; //Date.now();
              writeSubject(myMsg['angels'][1]); fixTxt();
            }
          else
          {
            utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['angels'][getRandomArbitrary(0,3)];
            writeSubject(myMsg['angels'][1]); fixTxt();
          }
          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult( myMsg['angels'][1]);
          }
          break;

          case 68://d 68
          if($(".card").attr("id") == myPaints[1]["name"].toString())
          {
          synth.cancel();
          //var utterThis = new SpeechSynthesisUtterance();
          //utterThis.stop;
          //synth.speak(utterThi);

          if(myMsg['dog']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['dog'][getRandomArbitrary(0,3)];
              myMsg['dog']['check'] = 1; //Date.now();
              writeSubject(myMsg['dog'][1]); fixTxt();
            }
          else
          {
            utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['dog'][getRandomArbitrary(0,3)];
            writeSubject(myMsg['dog'][1]); fixTxt();
          }
          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult( myMsg['dog'][1]);
          }
          break;

          case 83://s 83
          if($(".card").attr("id") == myPaints[1]["name"].toString())
          {
          synth.cancel();
          //var utterThis = new SpeechSynthesisUtterance();
          //utterThis.stop;
          //synth.speak(utterThi);

          if(myMsg['hut']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['hut'][getRandomArbitrary(0,3)];
              myMsg['hut']['check'] = 1; //Date.now();
              writeSubject(myMsg['hut'][1]); fixTxt();
            }
          else
          {
            utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['hut'][getRandomArbitrary(0,3)];
            writeSubject(myMsg['hut'][1]); fixTxt();
          }
          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult( myMsg['hut'][1]);
          }
          break;

          case 70://f 70
          if($(".card").attr("id") == myPaints[1]["name"].toString())
          {
          synth.cancel();
          //var utterThis = new SpeechSynthesisUtterance();
          //utterThis.stop;
          //synth.speak(utterThi);

          if(myMsg['baby']['check'] == 0)
            {
              utterThis.text = myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['baby'][getRandomArbitrary(0,3)];
              myMsg['baby']['check'] = 1; //Date.now();
              writeSubject(myMsg['baby'][1]); fixTxt();
            }
          else
          {
            utterThis.text = myMsg['re'][getRandomArbitrary(0,3)]+""+myMsg['touching'][getRandomArbitrary(0,3)]+""+ myMsg['baby'][getRandomArbitrary(0,3)];
            writeSubject(myMsg['baby'][1]); fixTxt();
          }
          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          //getResult( myMsg['baby'][1]);
          }
          break;



        }

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


        function writeSubject(sbjText)
        {
          $("#answer").html(myMsg['touching'][getRandomArbitrary(0,3)]+""+sbjText);

        }

        function txtRedirect(tmpText)
        {
          switch (tmpText.toLowerCase()) {
            case myMcoms["moff"].toString():
                console.log("Music pause cause: ",myMcoms["moff"]);
                music.pause(); music.currentTime = 0;
              break;
              case myMcoms["mon"].toString():
                  console.log("Music play cause : ",myMcoms["mon"]);
                  music.play();
              break;
              case  myMcoms["mdown"].toString():
                $(music).animate({volume: 0.05}, 1000);
              break;
              case  myMcoms["mup"].toString():
                $(music).animate({volume: 1}, 1000);
              break;
              case  myMcoms["restart"].toString():
                console.log("Restart cause : ",myMcoms["restart"]);
              case  myMcoms["restart2"].toString():
                console.log("Restart cause : ",myMcoms["restart2"]);
                reStart();
                /*
                ctrlK = 1;
                active = 0;
                synth.cancel();
                $("#answer").stop().fadeOut();
                music.pause(); music.currentTime = 0;
                StartNow();
                */
              break;

              case myMcoms["change"].toString():
                synth.cancel();
                $("#answer").stop().fadeOut();
                music.pause(); music.currentTime = 0;
                var utterThis = new SpeechSynthesisUtterance();
                if(myMsg["which"]["check"]==0)
                  myMsg["which"]["check"]=1;
                utterThis.text = myMsg["which"][1];
                utterThis.voice = voices[VOICEIDX];
                synth.speak(utterThis);
                //getResult('descrivi maria');
                console.log("Ultima richiesta: ", myMcoms["change"]);
              break;

              case myPaints[1]["name"].toString().toLowerCase():
              if(myMsg["which"]["check"]==1)
              {

                  $(".card").removeAttr("id");
                  $(".card").attr("id", myPaints[1]["name"].toString());

                  console.log("Quadro scelto (card): ",$(".card").attr("id"));
                  myMsg["which"]["check"]=0;
                  txtRedirect("ricomincia");
                  break;
                }
              case myPaints[2]["name"].toString().toLowerCase():
              if(myMsg["which"]["check"]==1)
              {
                $(".card").removeAttr("id");
                $(".card").attr("id", myPaints[2]["name"].toString());

                console.log("Quadro scelto (card): ",$(".card").attr("id"));
                myMsg["which"]["check"]=0;
                txtRedirect( myMcoms["restart"].toString());

              break;
              }
              case myPaints[3]["name"].toString().toLowerCase():
              case myPaints[4]["name"].toString().toLowerCase():
              if(myMsg["which"]["check"]==1)
              {
                $(".card").removeAttr("id");
                $(".card").attr("id", myPaints[3]["name"].toString());

                console.log("Quadro scelto (card): ",$(".card").attr("id"));
                myMsg["which"]["check"]=0;
                txtRedirect( myMcoms["restart"].toString());

              break;
              }
            default:
              synth.cancel();
              getResult($("#question").val());
              break;

          }
        }

        function fixTxt()
        {
          $("#answer").stop();
          $("#answer").css({ top: $("body").height()/2});
        }


        function reStart()
        {
          ctrlK = 1;
          active = 0;
          synth.cancel();
          $("#answer").stop().fadeOut();
          music.pause(); music.currentTime = 0;
          StartNow();

        }
        //START
        function StartNow(){
          var now = Date.now();
          if((now - lastQuestionTime  > standbyTime ) && (now - lastHandlingTime  > standbyTime)) active = 0;
          console.log("** ctrlK **", ctrlK);//if ((frame.hands.length > 0){}

          //cambia il messaggio di benvenuto in funzione del quadro scelto (predisposto per quando si crea l'opzione)
          if($(".card").attr("id") ==  myPaints[1]["name"].toString())
          {
            currWelcome = myMsg['welcome'][1];
            //$(".painting").removeAttr("src");
            $(".painting").attr("src", myPaints[1]["src"].toString());
          }
          if($(".card").attr("id") ==  myPaints[2]["name"].toString())
          {
              currWelcome = myMsg['welcome'][2];
              //$(".painting").removeAttr("src");
              $(".painting").attr("src", myPaints[2]["src"].toString());
          }
          if( ($(".card").attr("id") ==  myPaints[3]["name"].toString()) ||($(".card").attr("id") ==  myPaints[4]["name"].toString()))
          {
              currWelcome = myMsg['welcome'][3];
              //$(".painting").removeAttr("src");
              $(".painting").attr("src", myPaints[3]["src"].toString());
          }
          console.log("*** La card è ", $(".card").attr("id"));


          if (ctrlK==1){
              lastHandlingTime = Date.now();
              if (active == 0){
                  music.play();

                  $(".painting").fadeTo(5000,1);
                  setTimeout(function(){
                      //synth.cancel();
                      $(music).animate({volume: 0.1}, 1000);


                      //scrittura su schermo 1(?)
                      $("#answer").hide();
                      $("#answer").stop();
                      $("#answer").fadeIn({duration: $(document).height()/2, queue:false});
                      $("#answer").html(currWelcome);
                      //console.log($(document).height())
                      $("#answer").css({ top: $("body").height()/2});
                       //
                       /*
                       $("#answer").stop();
                       $("#answer").fadeIn({duration:2000, queue:false});
                       $("#answer").html(answer);
                       $("#answer").css({ top: '500px' });
                       $("#answer").css({ top: $(document).height()/2});
                       $("#answer").animate({top: -1000, queue:false},  3000 * answer.length/30);
                       //
                       $("#answer").html(answer);
                       $("#answer").css({ top: $(document).height()/2});
                       - $("#answer").animate({top: -1000, queue:false},  3000 * answer.length/30);
                       + var len = answer.length;
                       + var perc = (len/100)*10;
                       + $("#answer").animate({top: -1000, queue:false},   3000*len/perc);
                       */
                      //
                      var len = currWelcome.length;
                      var perc = (len* 0.1);
                      $("#answer").animate({top: - ($(document).height()/2), queue:false},   3000*len/perc);

                      console.log("ANSWER LENGTH: ", len);
                      console.log("VALUE X length: ",perc);

                      var utterThis = new SpeechSynthesisUtterance();
                      utterThis.text = currWelcome;
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
              //console.log("normalizedPosition", normalizedPosition);
          }

        }
        //stop


    var client = new $.es.Client({
        hosts: 'localhost:9200'
    });

    var bg = document.querySelector('html');

    //var card = "";
    var askedNames =  new Array();






    // Handler for .ready() called.

     $(".card").on('mousedown', function(e) {
        if( e.which == 2 ) {
           e.preventDefault();
           console.log("e.which = MIDDLE BUTTON!");
           if(music.paused)
            music.play();
           else
          { music.pause(); music.currentTime = 0; }

         }
       }
     );


    $(".card").on("click", function() {
      if(ctrlK == 0 && active == 0)
        reStart();
      else {


        card = $(".card").attr("id");
        $("#answer").html(card);
        beep();
        synth.cancel();
        $(music).animate({volume: 0.1}, 1000);
        if(active == 1)
        recognition.stop();
        recognition.start();
        //voices = synth.getVoices();
        lastQuestionTime =  Date.now();
        //StartNow();//controller.connect();
      }
    });
    $(".card").on("mouseenter", function() {
        if (card === $(".card").attr("id"))
            return;
        card = $(".card").attr("id");


        var utterThis = new SpeechSynthesisUtterance(card);
        utterThis.voice = voices[VOICEIDX];
        synth.speak(utterThis);
    });

    $("#question").keypress(function(e) {
    if(e.which == 13) {
        if(ctrlK==1 && active ==1)
          card = $(".card").attr("id");
        $(music).animate({volume: 0.1}, 1000);
        lastQuestionTime =  Date.now

        var tmpText=($("#question").val()).toLowerCase();

        txtRedirect(tmpText);
        console.log("e.which =13!!!!!!!");
    }


});



    recognition.onresult = function(event) {
        var last = event.results.length - 1;
        var text = event.results[last][0].transcript;
        $("#question").val(text)

        txtRedirect(text);
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

                var toSynthText = response.hits.hits[0]._source.answer;//+" Testo aggiunto.";
                var moreAsk = " Puoi chiedermi ";
                console.log("toSynthText: ",toSynthText);

                var suggests = response.hits.hits[0]._source.suggests;

                for (i in suggests)
                {

                  if(askedNames[ suggests[i]["linkedName"] ]!=undefined)
                    console.log("**** AskedNames in suggest file", askedNames[ suggests[i]["linkedName"] ]);

                  if(askedNames[ suggests[i]["linkedName"] ]==undefined)
                  {
                    if(c==undefined) var c = true;
                    if(c==true) {toSynthText+= moreAsk; c=false; }
                    else toSynthText+= ", ";

                    toSynthText+= " "+suggests[i]["suggest"];
                  }

                  console.log("Nel for toSynthText:", toSynthText);

                }
                var answer = toSynthText;
                var len = answer.length;
                var perc = (len*0.1);

                //scrittura su schermo 2(?)
                $("#answer").hide();
                $("#answer").stop();
                $("#answer").fadeIn({duration:$(document).height()/2, queue:false});
                //$("#answer").fadeIn({duration:2000, queue:false});
                $("#answer").html(answer);
                //console.log($(document).height())
                $("#answer").css({ top: $("body").height()/2});

                $("#answer").animate({top: -($(document).height()*0.6), queue:false},   3000*len/perc);
                //$("#answer").animate({top: -1000, queue:false},   3000*len/perc);


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
                var utterThis = new SpeechSynthesisUtterance(myMsg['undef'][getRandomArbitrary(0,3)]);//messages['undef']);//myMsg['touching'][getRandomArbitrary(0,3)]
                utterThis.voice = voices[VOICEIDX];
                utterThis.onend = function (event) {
                            $(music).animate({volume: 1}, 1000);
                        }
                synth.speak(utterThis);

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
