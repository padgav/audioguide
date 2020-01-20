/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

function beep() {
  var snd = new Audio("data:audio/wav;base64,//uQRAAAAWMSLwUIYAAsYkXgoQwAEaYLWfkWgAI0wWs/ItAAAGDgYtAgAyN+QWaAAihwMWm4G8QQRDiMcCBcH3Cc+CDv/7xA4Tvh9Rz/y8QADBwMWgQAZG/ILNAARQ4GLTcDeIIIhxGOBAuD7hOfBB3/94gcJ3w+o5/5eIAIAAAVwWgQAVQ2ORaIQwEMAJiDg95G4nQL7mQVWI6GwRcfsZAcsKkJvxgxEjzFUgfHoSQ9Qq7KNwqHwuB13MA4a1q/DmBrHgPcmjiGoh//EwC5nGPEmS4RcfkVKOhJf+WOgoxJclFz3kgn//dBA+ya1GhurNn8zb//9NNutNuhz31f////9vt///z+IdAEAAAK4LQIAKobHItEIYCGAExBwe8jcToF9zIKrEdDYIuP2MgOWFSE34wYiR5iqQPj0JIeoVdlG4VD4XA67mAcNa1fhzA1jwHuTRxDUQ//iYBczjHiTJcIuPyKlHQkv/LHQUYkuSi57yQT//uggfZNajQ3Vmz+Zt//+mm3Wm3Q576v////+32///5/EOgAAADVghQAAAAA//uQZAUAB1WI0PZugAAAAAoQwAAAEk3nRd2qAAAAACiDgAAAAAAABCqEEQRLCgwpBGMlJkIz8jKhGvj4k6jzRnqasNKIeoh5gI7BJaC1A1AoNBjJgbyApVS4IDlZgDU5WUAxEKDNmmALHzZp0Fkz1FMTmGFl1FMEyodIavcCAUHDWrKAIA4aa2oCgILEBupZgHvAhEBcZ6joQBxS76AgccrFlczBvKLC0QI2cBoCFvfTDAo7eoOQInqDPBtvrDEZBNYN5xwNwxQRfw8ZQ5wQVLvO8OYU+mHvFLlDh05Mdg7BT6YrRPpCBznMB2r//xKJjyyOh+cImr2/4doscwD6neZjuZR4AgAABYAAAABy1xcdQtxYBYYZdifkUDgzzXaXn98Z0oi9ILU5mBjFANmRwlVJ3/6jYDAmxaiDG3/6xjQQCCKkRb/6kg/wW+kSJ5//rLobkLSiKmqP/0ikJuDaSaSf/6JiLYLEYnW/+kXg1WRVJL/9EmQ1YZIsv/6Qzwy5qk7/+tEU0nkls3/zIUMPKNX/6yZLf+kFgAfgGyLFAUwY//uQZAUABcd5UiNPVXAAAApAAAAAE0VZQKw9ISAAACgAAAAAVQIygIElVrFkBS+Jhi+EAuu+lKAkYUEIsmEAEoMeDmCETMvfSHTGkF5RWH7kz/ESHWPAq/kcCRhqBtMdokPdM7vil7RG98A2sc7zO6ZvTdM7pmOUAZTnJW+NXxqmd41dqJ6mLTXxrPpnV8avaIf5SvL7pndPvPpndJR9Kuu8fePvuiuhorgWjp7Mf/PRjxcFCPDkW31srioCExivv9lcwKEaHsf/7ow2Fl1T/9RkXgEhYElAoCLFtMArxwivDJJ+bR1HTKJdlEoTELCIqgEwVGSQ+hIm0NbK8WXcTEI0UPoa2NbG4y2K00JEWbZavJXkYaqo9CRHS55FcZTjKEk3NKoCYUnSQ0rWxrZbFKbKIhOKPZe1cJKzZSaQrIyULHDZmV5K4xySsDRKWOruanGtjLJXFEmwaIbDLX0hIPBUQPVFVkQkDoUNfSoDgQGKPekoxeGzA4DUvnn4bxzcZrtJyipKfPNy5w+9lnXwgqsiyHNeSVpemw4bWb9psYeq//uQZBoABQt4yMVxYAIAAAkQoAAAHvYpL5m6AAgAACXDAAAAD59jblTirQe9upFsmZbpMudy7Lz1X1DYsxOOSWpfPqNX2WqktK0DMvuGwlbNj44TleLPQ+Gsfb+GOWOKJoIrWb3cIMeeON6lz2umTqMXV8Mj30yWPpjoSa9ujK8SyeJP5y5mOW1D6hvLepeveEAEDo0mgCRClOEgANv3B9a6fikgUSu/UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU" + Array(1e3).join(123));
  snd.play();
}

//var itsACom = false;

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var recognition;
var speechRecognitionList;
var lastQuestionTime = Date.now();
var lastHandlingTime = Date.now();
var touchs;
var standbyTime = 60 * 1000;
var myTimeOut;

var input = "";
var startKeyStroke = false;
var keyStrokeValue = "";
var currentPress;
var lastPress;
var cp = 0;
var lp = 0;

var messages = new Array();
var voices;
var VOICEIDX = 3;
var focusElem = false;

var rateStd = 0.9;
var currRate = rateStd;

var myMcoms = {
  moff: "spegni la musica",
  mon: "accendi la musica",
  mdown: "abbassa la musica",
  mup: "solleva la musica",
  restart: "ricomincia",
  restart2: "ricomincia da capo",
  quiet: "basta",
  quiet2: "silenzio",
  quiet3: "fermati",
  change: "cambia quadro",
  time: "che ore sono",
  vup: "aumenta la voce",
  vdown: "abbassa la voce"
}

//tessera 0008657628 key 0000142480
//quadri = {1: "Adorazione", 2: "Annunciazione", 3: "Crocefissione"}
///

var synth = window.speechSynthesis;

var bg;

var card = "Gennamaria";
var img;
var music = new Audio();
music.src = "/";
//var music = new Audio("music/coro_angelico.mp3");

///////////////////////////////////////
// start load conf
//////////////////////////////////////

var start_conf_path = './conf/start_conf.json';

var adorazione_conf_path = './conf/adorazione_conf.json';
var annunciazione_conf_path = './conf/annunciazione_conf.json';
var crocefissione_conf_path = './conf/crocefissione_conf.json';
var gennamaria_conf_path = './conf/gennamaria_conf.json';

var current_painting;
var adorazione_paint;
var annunciazione_paint;
var crocefissione_paint;
var gennamaria_paint

var msg_conf__pic_path = './conf/msg_conf.json';
var msg_conf_plastic_path = './conf/msg_conf_plastic.json';

var msg_conf;
var msg_conf_pic;
var msg_conf_plastic;


//start_conf json load
fetch(start_conf_path).then(response => {
  return response.json();
}).then(data => {
  // Work with your JSON data here..
  $(".card").removeAttr("id");
  $(".card").attr("id", data["start1"]);
  console.log(data);
}).catch(err => {
  // What do when the request fails
  console.log('The request failed!');
});
//adorazione_conf json load
fetch(adorazione_conf_path).then(response => {
  return response.json();
}).then(data => {
  // Work with your JSON data here..
  adorazione_paint = data
  //default current_painting assignation
  if($(".card").attr("id") == 'Adorazione')
    current_painting = adorazione_paint;
  //current_painting = adorazione_paint;
  console.log(data);
}).catch(err => {
  // What do when the request fails
  console.log('The request failed!');
});

//annunciazione_conf json load
fetch(annunciazione_conf_path).then(response => {
  return response.json();
}).then(data => {
  // Work with your JSON data here..
  annunciazione_paint = data;
  //default current_painting assignation
  if($(".card").attr("id") == 'Annunciazione')
    current_painting = annunciazione_paint;
  console.log(data);
}).catch(err => {
  // What do when the request fails
  console.log('The request failed!');
});

//crocefissione_conf json load
fetch(crocefissione_conf_path).then(response => {
  return response.json();
}).then(data => {
  // Work with your JSON data here..
  crocefissione_paint = data;
  //default current_painting assignation
  if($(".card").attr("id") == 'Crocefissione')
    current_painting = crocefissione_paint;
  console.log(data);
}).catch(err => {
  // What do when the request fails
  console.log('The request failed!');
});

//gennamaria_conf json load
fetch(gennamaria_conf_path).then(response => {
  return response.json();
}).then(data => {
  // Work with your JSON data here..
  gennamaria_paint = data;
  //default current_painting assignation
  if($(".card").attr("id") == 'Gennamaria')
    current_painting = gennamaria_paint;
  console.log(data);
}).catch(err => {
  // What do when the request fails
  console.log('The request failed!');
});

//msg_conf json load
fetch(msg_conf__pic_path).then(response => {
  return response.json();
}).then(data => {
  // Work with your JSON data here..
  msg_conf_pic = data;
  if($(".card").attr("id") != 'Gennamaria')
    msg_conf = msg_conf_pic;
  console.log(data);
}).catch(err => {
  // What do when the request fails
  console.log('The request failed!');
});
fetch(msg_conf_plastic_path).then(response => {
  return response.json();
}).then(data => {
  // Work with your JSON data here..
  msg_conf_plastic = data;
  if($(".card").attr("id") == 'Gennamaria')
    msg_conf = msg_conf_plastic;
  console.log(data);
}).catch(err => {
  // What do when the request fails
  console.log('The request failed!');
});
///////////////////////////////////////
// end load conf
//////////////////////////////////////

synth.onvoiceschanged = function() {
  voices = synth.getVoices();

};

//get random integer from min up to max
function getRandomArbitrary(min, max) {

  x = Math.floor(Math.random() * (max - min + 1) ) + min;
  return x;

}

//Removes all KClasses but the passed value
function RemoveKClasses(x) {
  for (let i = 1; i < 5; i++)
  {
    if(i!=x)
      $(".painting").removeClass("k"+i);
  }
  //$(".card").attr
}

/*
var handler = function(e) {
	console.log(this.id);
	e.stopPropagation();
};
*/

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
  var ctrlK = 0;
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
    if (x == lastX && (x != 107 && x != 109)) return;
    lastX = x;

    var utterThis = new SpeechSynthesisUtterance();
    switch (x) {

      default:
        console.log("pressione tastiera: ", window.event.keyCode);
        break;
    }
    console.log("LOGGING X: ", x);

    //touchs = myMsg['touching'][getRandomArbitrary(0,3)];
    touchs = msg_conf['touching'][getRandomArbitrary(0, 2)];

    //w 87 a 65 s 83 d 68 f 70 g 71
    if (focusElem != true) //wasdfg
      switch (x) {

        case 32:
          ctrlK = 1;
          StartNow();
          //getResult('adorazione');
          console.log("MetaKey pressed: ", ctrlK);

          break;

        case 37: //larrow //2shephard
        //$("kenburns1").attr('transform: scale3d(1, 1, 2.5) translate3d(0px, -0px, 0px)');
        //$(".card").attr("id", annunciazione_paint["name"]);
        if($(".card").attr("id") == "Gennamaria")
        {
          $(".painting").addClass("k1");
          RemoveKClasses(1);
        }
        //$(".painting").removeClass("k2");
        //$(".painting").removeClass("k3");
        //$(".painting").removeClass("k4");


/*
//example 3
$('#container').children().filter('div').dcss(
    {
    transform : 'translate(<transX>%,<transY>%)  scale(.5,.5)',
    transition : 'all 1s <delay>s linear'
    },
    {
        delay  : function(i,el,c){ return i * .1;},
        transX : function(){ return 50 - Math.random()*100;},
        transY : function(){ return 50 - Math.random()*100;}
    });
*/
/*
	// Reset the animation
	$(selector).resetKeyframe(callback);

	// Pause the animation
	$(selector).pauseKeyframe();

	// Resume the animation
	$(selector).resumeKeyframe();
*/


//img = $(".painting").attr("id");
//$("p").addClass("myClass yourClass");
//          $(".card").removeAttr("id");

// =>>> div(card).img.class = painting / = k1;
          if (current_painting['subjects'][37] == null)
            break;

          if (current_painting['subjects'][37]['check'] == 0)
          {

            current_painting['subjects'][37]['check'] = 1;
          }
          synth.cancel();



          utterThis.text = touchs + "" + current_painting['subjects'][37]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][37]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][37]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          break;

        case 38: // uparrow
        if($(".card").attr("id") == "Gennamaria")
        {
          $(".painting").addClass("k2");
          RemoveKClasses(2);
        }
        //$(".painting").removeClass("k1");
        //$(".painting").removeClass("k3");
        //$(".painting").removeClass("k4");
          if (current_painting['subjects'][38] == null)
            break;

          if (current_painting['subjects'][38]['check'] == 0)
          {

            current_painting['subjects'][38]['check'] = 1;
          }
          synth.cancel();

          utterThis.text = touchs + "" + current_painting['subjects'][38]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][38]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][38]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);

          break;

        case 39: // rarrow

          if (current_painting['subjects'][39] == null)
            break;

          if (current_painting['subjects'][39]['check'] == 0)
            current_painting['subjects'][39]['check'] = 1;
          synth.cancel();

          utterThis.text = touchs + "" + current_painting['subjects'][39]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][39]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][39]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);

          break;

        case 40: //darrow

          if (current_painting['subjects'][40] == null)
            break;

          if (current_painting['subjects'][40]['check'] == 0)
            current_painting['subjects'][40]['check'] = 1;
          synth.cancel();

          utterThis.text = touchs + "" + current_painting['subjects'][40]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][40]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][40]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);

          break;

        case 87: // w 87

          if (current_painting['subjects'][87] == null)
            break;

          if (current_painting['subjects'][87]['check'] == 0)
            current_painting['subjects'][87]['check'] = 1;
          synth.cancel();

          utterThis.text = touchs + "" + current_painting['subjects'][87]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][87]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][87]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);

          break;

        case 65: //a 65

        if($(".card").attr("id") == "Gennamaria")
        {
          $(".painting").addClass("k4");
          RemoveKClasses(4);
        }
        //$(".painting").removeClass("k3");
        //$(".painting").removeClass("k1");
        //$(".painting").removeClass("k2");
          if (current_painting['subjects'][65] == null)
            break;

          if (current_painting['subjects'][65]['check'] == 0)
            current_painting['subjects'][65]['check'] = 1;
          synth.cancel();

          utterThis.text = touchs + "" + current_painting['subjects'][65]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][65]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][65]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);

          break;

        case 68: //d 68

          if (current_painting['subjects'][68] == null)
            break;

          if (current_painting['subjects'][68]['check'] == 0)
            current_painting['subjects'][68]['check'] = 1;
          synth.cancel();

          utterThis.text = touchs + "" + current_painting['subjects'][68]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][68]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][68]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);

          break;

        case 83: //s 83

          if (current_painting['subjects'][83] == null)
            break;

          if (current_painting['subjects'][83]['check'] == 0)
            current_painting['subjects'][83]['check'] = 1;
          synth.cancel();

          utterThis.text = touchs + "" + current_painting['subjects'][83]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][83]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][83]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);

          break;

        case 70: //f 70

        if($(".card").attr("id") == "Gennamaria")
        {
          $(".painting").addClass("k3");
          RemoveKClasses(3);
        }
          //$(".painting").removeClass("k1");
          //$(".painting").removeClass("k2");
          //$(".painting").removeClass("k4");

          if (current_painting['subjects'][70] == null)
            break;

          if (current_painting['subjects'][70]['check'] == 0)
            current_painting['subjects'][70]['check'] = 1;
          synth.cancel();

          utterThis.text = touchs + "" + current_painting['subjects'][70]["desc"][getRandomArbitrary(0, 2)];
          utterThis.text = touchs + "" + current_painting['subjects'][70]["desc"][getRandomArbitrary(0, 2)];
          writeSubject(current_painting['subjects'][70]["desc"][0]);

          utterThis.voice = voices[VOICEIDX];
          synth.speak(utterThis);
          break;

        case 107: //+ 107
          txtRedirect(myMcoms["vup"]);
          break;
        case 109: //- 109
          txtRedirect(myMcoms["vdown"]);
          break;

      }

  }


  function writeSubject(sbjText) {
    $("#answer").html(touchs + " " + sbjText);
    $("#answer").stop();
    $("#answer").css({
      top: $("body").height() / 2
    });
    //fixTxt();
  }

  function comunicateInfo(infoTxt) {
    $("#answer").html(infoTxt);
    $("#answer").stop();
    $("#answer").css({
      top: $("body").height() / 2
    });
    //fixTxt();
  }

  function txtRedirect(tmpText) {
    switch (tmpText.toLowerCase()) {

      case myMcoms["moff"]:
        console.log("Music pause cause: ", myMcoms["moff"]);
        music.pause();
        music.currentTime = 0;
        break;

      case myMcoms["mon"]:
        console.log("Music play cause: ", myMcoms["mon"]);
        music.play();
        break;

      case myMcoms["mdown"]:
        console.log("Music down cause: ", myMcoms["mdown"]);
        $(music).animate({
          volume: 0.05
        }, 1000);
        break;

      case myMcoms["mup"]:
        console.log("Music up cause: ", myMcoms["mup"]);
        $(music).animate({
          volume: 1
        }, 1000);
        break;

      case myMcoms["vup"]:
        console.log("Voice up cause: ", myMcoms["vup"]);
        currRate = currRate + 0.05;
        console.log("Curr rate: ", currRate);
        break;

      case myMcoms["vdown"]:
        console.log("Voice down cause: ", myMcoms["vdown"]);
        currRate = currRate - 0.05;
        console.log("Curr rate: ", currRate);
        break;

      case myMcoms["time"]:
        console.log("Time info cause: ", myMcoms["time"]);
        tellMeTime();
        break;

      case myMcoms["restart"]:
        console.log("Restart cause: ", myMcoms["restart"]);
      case myMcoms["restart2"]:
        console.log("Restart cause: ", myMcoms["restart2"]);

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

      case myMcoms["quiet"]:
        console.log("Turn off cause: ", myMcoms["quiet"]);
      case myMcoms["quiet2"]:
        console.log("Turn off cause: ", myMcoms["quiet2"]);
      case myMcoms["quiet3"]:
        console.log("Turn off cause: ", myMcoms["quiet3"]);
        quietPlease();

        break;

      case myMcoms["change"]:

        synth.cancel();
        $("#answer").stop().fadeOut();
        music.pause();
        music.currentTime = 0;
        var utterThis = new SpeechSynthesisUtterance();

        if (msg_conf["check"] == 0)
          msg_conf["check"] = 1;
        utterThis.text = msg_conf["which"];
        utterThis.voice = voices[VOICEIDX];

        synth.speak(utterThis);
        //getResult('descrivi maria');
        console.log("Ultima richiesta: ", myMcoms["change"]);
        break;

      case adorazione_paint["name"].toLowerCase():
        if (msg_conf["check"] == 1) {

          $(".card").removeAttr("id");
          $(".card").attr("id", adorazione_paint["name"]);

          console.log("Quadro scelto (card): ", $(".card").attr("id"));
          msg_conf["check"] = 0;
          txtRedirect("ricomincia");
          break;
        }
    	case annunciazione_paint["name"].toLowerCase():
          if (msg_conf["check"] == 1) {
            $(".card").removeAttr("id");
            $(".card").attr("id", annunciazione_paint["name"]);

            console.log("Quadro scelto (card): ", $(".card").attr("id"));
            msg_conf["check"] = 0;
            txtRedirect(myMcoms["restart"]);

        	break;
          }
        case crocefissione_paint["name"].toLowerCase():
        case crocefissione_paint["alt_name"].toLowerCase():
        	if (msg_conf["check"] == 1) {
              $(".card").removeAttr("id");
              $(".card").attr("id", crocefissione_paint["name"]);

              console.log("Quadro scelto (card): ", $(".card").attr("id"));
              msg_conf["check"] = 0;
              txtRedirect(myMcoms["restart"]);

            break;
        	}
        case gennamaria_paint["name"].toLowerCase():
        case gennamaria_paint["alt_name"].toLowerCase():
        	if (msg_conf["check"] == 1) {
              $(".card").removeAttr("id");
              $(".card").attr("id", gennamaria_paint["name"]);

              console.log("Opera scelta (card): ", $(".card").attr("id"));
              //msg_conf => msg_conf_plastic_path
              msg_conf["check"] = 0;
              txtRedirect(myMcoms["restart"]);

            break;
        	}
        default:
            synth.cancel();
            getResult($("#question").val());
            break;

    }
  }

  function reStart() {
    ctrlK = 1;
    active = 0;
    synth.cancel();
    $("#answer").stop().fadeOut();
    music.pause();
    music.currentTime = 0;
    StartNow();

  }

  function quietPlease() {
    //ctrlK = 1;
    //active = 0;

    clearTimeout(myTimeOut);
    $("#answer").stop().fadeOut();

    music.pause();
    synth.pause();
    music.currentTime = 0;

  }

  //START
  function StartNow() {
    var now = Date.now();


    //"music/coro_angelico.mp3";
    console.log("Outer adorazione_paint on start: ", adorazione_paint);
    console.log("Outer annunciazione_paint on start: ", annunciazione_paint);
    console.log("Outer crocefissione_paint start: ", crocefissione_paint);
    console.log("Outer gennamaria_paint start: ", gennamaria_paint);


    switch ($(".card").attr("id")) {
      case adorazione_paint["name"]:
        current_painting = adorazione_paint;
        msg_conf = msg_conf_pic;
        console.log("CARD ID IN STARTNOW ADOR: ", current_painting["name"]);

        break;

      case annunciazione_paint["name"]:
        current_painting = annunciazione_paint;
        msg_conf = msg_conf_pic;
        console.log("CARD ID IN STARTNOW ANNUNC: ", current_painting["name"]);

        break;

      case crocefissione_paint["name"]:
        current_painting = crocefissione_paint;
        msg_conf = msg_conf_pic;
        console.log("CARD ID IN STARTNOW CROC: ", current_painting["name"]);

        break;

      case gennamaria_paint["name"]:
        current_painting = gennamaria_paint;
        msg_conf = msg_conf_plastic;
        console.log("CARD ID IN STARTNOW GEANNAM: ", current_painting["name"]);

        break;

      default:
        console.log("CARD ID NON RICONOSCIUTO IN STARTNOW()!")
        break;
    }
    console.log("Outer current_painting assigned on start: ", current_painting);

    console.log("Outer msg on start: ", msg_conf);



    if( music.src = "/")
      music.src = "music/"+current_painting["music"];



    if ((now - lastQuestionTime > standbyTime) && (now - lastHandlingTime > standbyTime)) active = 0;
    console.log("** ctrlK **", ctrlK); //if ((frame.hands.length > 0){}

    //cambia il messaggio di benvenuto in funzione del quadro scelto (predisposto per quando si crea l'opzione)
    let name = current_painting["name"];
    if(current_painting["alt_name"]!= null)
      name = current_painting["alt_name"];
    if ($(".card").attr("id") == current_painting["name"]) {
      currWelcome = msg_conf['welcome'][0] + current_painting["support"] + current_painting["art"] + name + current_painting["caption"] + msg_conf['welcome'][1];
      //$(".painting").removeAttr("src");
      $(".painting").attr("src", current_painting["src"]);
      console.log("*** sto cambiando immagine con: ", current_painting["src"]);
    }


    console.log("*** La card è ", $(".card").attr("id"));


    if (ctrlK == 1) {
      lastHandlingTime = Date.now();
      if (active == 0) {
        music.play();

        $(".painting").fadeTo(5000, 1);
        myTimeOut = setTimeout(function() {
          //synth.cancel();
          $(music).animate({
            volume: 0.1
          }, 1000);

          //scrittura su schermo 1(?)
          $("#answer").hide();
          $("#answer").stop();
          $("#answer").fadeIn({
            duration: $(document).height() / 2,
            queue: false
          });
          $("#answer").html(currWelcome);
          //console.log($(document).height())
          $("#answer").css({
            top: $("body").height() / 2
          });

          var len = currWelcome.length;
          var perc = (len * 0.1);
          $("#answer").animate({
            top: -($(document).height() / 2),
            queue: false
          }, 3000 * len / perc);

          console.log("ANSWER LENGTH: ", len);
          console.log("VALUE X length: ", perc);

          var utterThis = new SpeechSynthesisUtterance();
          utterThis.text = currWelcome;
          utterThis.voice = voices[VOICEIDX];
          utterThis.rate = currRate;

          utterThis.onend = function(event) {
            console.log("end");
            $(music).animate({
              volume: 1
            }, 1000);
            //recognition.start();
          }
          synth.speak(utterThis);

        }, 5000);
//fine setTimeout




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
  var askedNames = new Array();






  // Handler for .ready() called.

  $(".card").on('mousedown', function(e) {
    if (e.which == 2) {
      e.preventDefault();
      console.log("e.which = MIDDLE BUTTON!");
      if (music.paused)
        music.play();
      else {
        music.pause();
        music.currentTime = 0;
      }

    }
  });
/*
  $(".card").on("dblclick", function() {
    console.log("DOUBLE CLICKED!!!");
    if (ctrlK == 0 && active == 0)
      reStart();
    else {

      card = $(".card").attr("id");
      $("#answer").html(card);
      beep();
      synth.cancel();
      $(music).animate({
        volume: 0.1
      }, 1000);
      if (active == 1)
        recognition.stop();
      recognition.start();
      //voices = synth.getVoices();
      lastQuestionTime = Date.now();
      //StartNow();//controller.connect();
    //}
  });
*/
  $(".card").on("click", function() {
    if (ctrlK == 0 && active == 0)
      reStart();
    else {


      card = $(".card").attr("id");
      $("#answer").html(card);
      beep();
      synth.cancel();
      $(music).animate({
        volume: 0.1
      }, 1000);
      if (active == 1)
        recognition.stop();
      recognition.start();
      //voices = synth.getVoices();
      lastQuestionTime = Date.now();
      //StartNow();//controller.connect();
    }
  });
  $(".card").on("mouseenter", function() {
    if (card === $(".card").attr("id"))
      return;
    card = $(".card").attr("id");


    //var utterThis = new SpeechSynthesisUtterance(card);
    //utterThis.voice = voices[VOICEIDX];
    //synth.speak(utterThis);
  });

  //numeric ascii 38-57
  $(document).keypress(function(ev) {

    if (ev.which > 38 && ev.which <= 57) {

      let v = ev.which - 48;

      if (startKeyStroke == false)
        keyStrokeInit(v);

      else {
        lastPress = new Date();
        lp = lastPress.getTime();
        let diff = lp - cp;
        if (diff < 150)
          keyStrokeValue += v;
        else {
          keyStrokeReset();
          keyStrokeInit(v);

        }
        console.log("diff lp - cp: ", diff);

        console.log("value: ", keyStrokeValue);
        console.log("currentPress: ", cp);
        console.log("lastPress: ", lp);
      }
    } else {
      if (ev.which == 13 && (keyStrokeValue.length == 10)) {
        catchKeyStroke(keyStrokeValue);
        console.log("Si tratta di un tag: ", keyStrokeValue);
      }
      keyStrokeReset();
      console.log("value not numeric", keyStrokeValue);

    }


  });

  function keyStrokeInit(v) {
    startKeyStroke = true;
    keyStrokeValue += v;
    console.log("value: ", keyStrokeValue);
    currentPress = new Date();
    cp = currentPress.getTime();
    console.log("current press time: ", cp);
  }

  function keyStrokeReset() {
    keyStrokeValue = "";
    startKeyStroke = false;
    cp = 0;
    keyStrokeValue = "";
    cp = 0;
    lp = 0;

  }
  //0000380280var

  function catchKeyStroke(value) {
    input = value;
    let cardValue;

    console.log("Evento keypress rilevato!", input);
    if ((input == adorazione_paint['id']) || (input == annunciazione_paint['id']) || (input == crocefissione_paint['id']) || (input == gennamaria_paint['id'])) {
      //imposto mypaints!
      switch (input) {
        case adorazione_paint['id']:
          cardValue = adorazione_paint["name"];
          break;

        case annunciazione_paint['id']:
          cardValue = annunciazione_paint["name"];
          break;

        case crocefissione_paint['id']:
          cardValue = crocefissione_paint['name'];
          break;

        case gennamaria_paint['id']:
          cardValue = gennamaria_paint['name'];
          break;

      }
      quietPlease();
      $(".card").removeAttr("id");
      $(".card").attr("id", cardValue)
      reStart();

      console.log("mypaints rilevato:", input);
    }

    input = "";
  }

  $("#question").keypress(function(e) {
    if (e.which == 13) { //return keypress
      if (ctrlK == 1 && active == 1)
        card = $(".card").attr("id");
      $(music).animate({
        volume: 0.1
      }, 1000);
      lastQuestionTime = Date.now

      var tmpText = ($("#question").val()).toLowerCase();

      txtRedirect(tmpText);
      console.log("e.which =13!!!!!!!");
    }


  });

  function tellMeTime() {
    let introduceH = "Sono le ore ";
    //let introduceM = " e ";
    let theDate = new Date();
    //let theTime = theDate.getTime();
    let hours = theDate.getHours();
    let minutes = theDate.getMinutes();

    let theTime = introduceH + hours + " e " /*+introduceM*/ + minutes;
    //theTime.getHours()
    //Recupera il valore dell'ora
    //getMinutes()

    var utterThis = new SpeechSynthesisUtterance();
    utterThis.text = theTime;
    utterThis.voice = voices[VOICEIDX];
    synth.speak(utterThis);
    comunicateInfo(introduceH + hours + ":" /*+introduceM*/ + minutes)
    console.log("che ore sono: ", myMcoms["time"]);

  }

  recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var text = event.results[last][0].transcript;
    $("#question").val(text)

    txtRedirect(text);
  }

  function getResult(text) {


    var card2 = "controls";
    var card1 = "Pinacoteca";
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
            must: [{
                bool: {
                  should: [{
                      match: {
                        question: {
                          query: text,
                          boost: 2
                        }
                      }
                    },
                    {
                      match: {
                        answer: text
                      }
                    }

                  ]
                }
              },
              {
                bool: {
                  should: [
                    {
                      match: {
                        title: card2
                      }
                    },
                    {
                      match: {
                        title: card
                      }
                    },/*
                    {
                      match: {
                        title: card1//"Pinacoteca"
                      }
                    },*/
                    {
                      match: {
                        key: text//"Pinacoteca"
                      }
                    }

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

        if(response.hits.hits[0]._source.title == "controls")
        {
          txtRedirect(response.hits.hits[0]._source.answer);
          return;
        }

        var toSynthText = response.hits.hits[0]._source.answer; //+" Testo aggiunto.";
        var moreAsk = " Puoi chiedermi ";
        console.log("toSynthText: ", toSynthText);
        console.log("**** KEY ****: ", response.hits.hits[0]._source.key);

        var suggests = response.hits.hits[0]._source.suggests;
        var keywords = response.hits.hits[0]._source.key;

        for (i in suggests) {

          if (askedNames[suggests[i]["linkedName"]] != undefined)
            console.log("**** AskedNames in suggest file", askedNames[suggests[i]["linkedName"]]);


          if (askedNames[suggests[i]["linkedName"]] == undefined) {
            if (c == undefined) var c = true;
            if (c == true) {
              toSynthText += moreAsk;
              c = false;
            } else toSynthText += ", ";

            toSynthText += " " + suggests[i]["suggest"];
          }

          console.log("Nel for toSynthText:", toSynthText);

        }
        var answer = toSynthText;
        var len = answer.length;
        var perc = (len * 0.1);

        //scrittura su schermo 2(?)
        $("#answer").hide();
        $("#answer").stop();
        $("#answer").fadeIn({
          duration: $(document).height() / 2,
          queue: false
        });
        //$("#answer").fadeIn({duration:2000, queue:false});
        $("#answer").html(answer);
        //console.log($(document).height())
        $("#answer").css({
          top: $("body").height() / 2
        });

        $("#answer").animate({
          top: -($(document).height() * 0.6),
          queue: false
        }, 3000 * len / perc);
        //$("#answer").animate({top: -1000, queue:false},   3000*len/perc);


        console.log("ANSWER LENGTH: ", len);
        console.log("VALUE X length: ", perc);

        $.post('log.php', {
          answer: answer,
          question: text,
          card: card
        });

        console.log("console all qa:", response.hits.hits[0]);

        var name = response.hits.hits[0]._source.name;
        if (askedNames[name] == undefined)
          askedNames[name] = 1;
        else
          askedNames[name]++;

        console.log("askedNames", askedNames);

        var utterThis = new SpeechSynthesisUtterance(toSynthText);

        utterThis.voice = voices[VOICEIDX];

        utterThis.onend = function(event) {
          $(music).animate({
            volume: 1
          }, 1000);
          //recognition.start();

          //}
        }

        synth.speak(utterThis);

        /*
        if (response.hits.hits[0]._source.link != undefined) {
          // card = response.hits.hits[0]._source.link;
          console.log("**** LINK: ", response.hits.hits[0]._source.link)
          console.log("**** KEY in answer", response.hits.hits[0]._source.key);
        }
        */
      } else {
        var utterThis = new SpeechSynthesisUtterance(msg_conf['undef'][getRandomArbitrary(0, 2)]); //messages['undef']);//myMsg['touching'][getRandomArbitrary(0,3)]
        utterThis.voice = voices[VOICEIDX];
        utterThis.onend = function(event) {
          $(music).animate({
            volume: 1
          }, 1000);
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
