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

var input = "0000000000";
var startKeyStroke = false;
var keyStrokeValue = "";
var currentPress;
var lastPress;

var API;

var voices;
var VOICEIDX = 0;
var rateStd = 0.9;
var currRate = rateStd;

var askedNames = {};

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

var synth = window.speechSynthesis;
var music = new Audio();
music.setAttribute("autoplay", "true");
music.setAttribute("muted", "muted");

///////////////////////////////////////
// start load conf
//////////////////////////////////////

var start_conf_path = './conf/start_conf.json';
var configurations = [];
var current_painting;
var current_index = -1;

readConfiguration().then(x => { restartAll()});  

async function readConfiguration() 
{
  var count = 0;
  var response = await fetch(start_conf_path);
  var data = await response.json()
  var startName = data.start;
  for(i in data.config_files){
    var item = data.config_files[i];
    var response1 = await fetch(item);
    var data1 = await response1.json();
    await configurations.push(data1);
    await console.log(data1.name);
    if (data1.name == startName) {
      current_painting = data1;
      current_index = count;
    }
    count++;
    var config_file = data1.conf;
    var r = await fetch(config_file);
    var conf = await r.json();
    data1.messages = conf;
  }
  return count;
}
 

///////////////////////////////////////
// end load conf
//////////////////////////////////////

synth.onvoiceschanged = function () {
  voices = synth.getVoices();
  console.log(voices)
};

// window.onload = loadingRes;
// /*window.onload*/
// function loadingRes() {
//   let resTimer = setTimeout(function () {
//     console.log("resourses loaded")
//     $(".painting").attr("src", current_painting["src"]);
//   }, 2000);
// }

//function GRS Get Random String
function grs(array) {
  return array[getRandomArbitrary(0, array.length - 1)];
}

//get random integer from min up to max
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function showText(message) {
  //$("#answer").hide();
  $("#answer").css({
    top: $("body").height() / 2
  });
  var color = "gray";
  if(current_painting.color != undefined) color = current_painting.color;
  $("#answer").css('color', color);
  $("#answer").hide();
  $("#answer").html(message);
  $("#answer").fadeIn();


 console.log ("altezza ", $("#answer").outerHeight());
 console.log ("altezza rghe", $("#answer").css("lineHeight"));


  var len = message.length;
  var duration = 80 * len;
  
  if(duration < 10000) duration = 10000;
  $("#answer").animate({
    top: -($(document).height()),
    queue: false
  }, duration , "linear");
}


function speechText(message, onendFunction) {
  var utterThis = new SpeechSynthesisUtterance();
  utterThis.text = message;
  utterThis.voice = voices[VOICEIDX];
  utterThis.rate = currRate;

  utterThis.onend = function (event) {
    console.log("*** WELCOME END!!! ***");
    if (onendFunction) onendFunction();
    $(music).animate({
      volume: 0.1
    }, 1000);
    $("#answer").stop().fadeOut();
  }
  synth.cancel();
  synth.speak(utterThis);

}
var timeout;
 function startWelcomeMessage() {
  ;
  music.src = "./music/" + current_painting.music;
  music.play();

  var name = current_painting.name;
  if(current_painting.alt_name != undefined) name = current_painting.alt_name
  var message = current_painting.messages.welcome[0] + current_painting.support +
    current_painting.art + name + current_painting.caption + current_painting.messages.welcome[1];

    timeout = setTimeout( function(){
    showText(message);
    speechText(message, function () { if (state == 1) state = 2 });
  }, current_painting.delay);
  
}

function restartAll(){
  clearTimeout(timeout);
  // stop speech
  synth.cancel();

  //stop music
  music.pause();

  //delete message on screen
  $("#answer").html("");

  //delete askedArray
  askedNames = {};

  state = 0;

  //show new image or model
  if(current_painting.type == "model"){
    $(".painting").hide();
    $(".model").show();
    if(current_painting.loaded != true){
      var iframe = document.getElementById( 'api-frame' );
      var client = new Sketchfab( iframe );
      client.init( current_painting.uid, {
        success: function onSuccess( api ){
            API = api;
            api.start();
            api.addEventListener( 'viewerready', function() {
            console.log( 'Viewer is ready' );
            current_painting.loaded = true;
          } );
        api.setCameraEasing('easeInOutQuad');
      },
      error: function onError() {
          console.log( 'Viewer error' );
      }
    
    } );

    }
  }
  else{
    $(".painting").show();
    $(".model").hide();
    $(".painting").attr("src", current_painting.src);
  }

  if(current_painting.startBehaviour == "standby"){
    state = 0;
  }
  else{
    state = 1;
    // start welcome message
    startWelcomeMessage();
  }
}



var state = 0;
//state = 0 standby
//state = 1 welcome message, stop sensor
//state = 2 ready for use

$(document).ready(function () {

  recognition = new SpeechRecognition();
  speechRecognitionList = new SpeechGrammarList();
  recognition.grammars = speechRecognitionList;
  //recognition.continuous = true;
  recognition.lang = 'it-IT';
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  //var synth = window.speechSynthesis;

  document.addEventListener('keydown', Tasto);

  var userActivity = false;
  setInterval(function () {
    if (userActivity == false) {
      state = 0;
      synth.cancel();
      $("#answer").html("");
    }
    userActivity = false
  } , 120000);

  var lastKey = -1;

  //funzione tasto
  function Tasto(e) {
    userActivity = true;
    var x = e.code;
    if(x != "Enter"){
      input = input + e.key;
      input = input.substr(1);
    }
    else{
      checkRfidCode(input);
;    }

    if (x == "Space") {
      //only for develop use
      //reset application in the state 0 

      state = 0;

      // stop speech
      synth.cancel();
      //delete message on screen
      $("#answer").html("");
      restartAll();
      //exit from Tasto function
      return;
    }

    else if(x == "ArrowRight"){
      current_index++;
      if(current_index >= configurations.length) current_index = 0;
      current_painting = configurations[current_index];
      restartAll();
       //exit from Tasto function
       return;
    }

    else if(x == "ArrowLeft"){
      current_index--;
      if(current_index < 0) current_index = configurations.length - 1;
      current_painting = configurations[current_index];
      restartAll();
       //exit from Tasto function
       return;
    }

    if (state == 0) {
      // standby state
      // go to state 1
      state = 1;

      // start welcome message
      startWelcomeMessage();
    }

    else if (state == 1) {
      //welcome message 
      if (x == "Escape") {
        console.log("ESC!");

        $("#answer").html("");
        synth.cancel();
        state = 2; //now ready!
      }

    }

    else if (state == 2) {
      //ready to use
      if (x == "KeyK") {
        //start recognition
        // stop speech
        synth.cancel();

        //delete message on screen
        $("#answer").html("");
        beep();
        recognition.stop();
        recognition.start();
      }

      else {
        //Normal sensor 
        if (lastKey != x && current_painting.subjects[x] != undefined) {
          var message = grs(current_painting.messages.touching) + grs(current_painting.subjects[x].desc);
          showText(message);
          speechText(message);
          lastKey = x;

          if(current_painting.type == "model"){
            if(current_painting.subjects[x].position != undefined && current_painting.subjects[x].target!= undefined){
              API.setCameraLookAt(
                current_painting.subjects[x].position, // eye position
                current_painting.subjects[x].target, // target to lookat
                6.0 // duration of the animation in seconds
            );
            }
          }else{

          
            var classAnimationName = "k" + current_painting.subjects[x].animation;
            $(".painting").removeClass($(".painting").data("lastclass"));
            $(".painting").data("lastclass", classAnimationName);
            $(".painting").addClass(classAnimationName);
          }
        }
      }
    }
  }

  //Process internal commands
  function processCommand(tmpText) {
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
          volume: 0.5
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

        restartAll();

        break;

      case myMcoms["quiet"]:
        console.log("Turn off cause: ", myMcoms["quiet"]);
      case myMcoms["quiet2"]:
        console.log("Turn off cause: ", myMcoms["quiet2"]);
      case myMcoms["quiet3"]:
        console.log("Turn off cause: ", myMcoms["quiet3"]);
        quietPlease();

        break;

      // case myMcoms["change"]:

      //   speechText("che cosa vuoi esplorare?");
      //   console.log("Ultima richiesta: ", myMcoms["change"]);
      //   break;

      // case adorazione_paint["name"].toLowerCase():
      //   if (msg_conf["check"] == 1) {

      //     $(".card").removeAttr("id");
      //     $(".card").attr("id", adorazione_paint["name"]);

      //     console.log("Quadro scelto (card): ", $(".card").attr("id"));
      //     msg_conf["check"] = 0;
      //     txtRedirect("ricomincia");
      //     break;
      //   }
      // case annunciazione_paint["name"].toLowerCase():
      //   if (msg_conf["check"] == 1) {
      //     $(".card").removeAttr("id");
      //     $(".card").attr("id", annunciazione_paint["name"]);

      //     console.log("Quadro scelto (card): ", $(".card").attr("id"));
      //     msg_conf["check"] = 0;
      //     txtRedirect(myMcoms["restart"]);

      //     break;
      //   }
      // case visitazione_paint["name"].toLowerCase():
      //   if (msg_conf["check"] == 1) {
      //     $(".card").removeAttr("id");
      //     $(".card").attr("id", visitazione_paint["name"]);

      //     console.log("Quadro scelto (card): ", $(".card").attr("id"));
      //     msg_conf["check"] = 0;
      //     txtRedirect(myMcoms["restart"]);

      //     break;
      //   }
      // case gennamaria_paint["name"].toLowerCase():
      // case gennamaria_paint["alt_name"].toLowerCase():
      //   if (msg_conf["check"] == 1) {
      //     $(".card").removeAttr("id");
      //     $(".card").attr("id", gennamaria_paint["name"]);

      //     console.log("Opera scelta (card): ", $(".card").attr("id"));
      //     //msg_conf => msg_conf_plastic_path
      //     msg_conf["check"] = 0;
      //     txtRedirect(myMcoms["restart"]);

      //     break;
      //  }
    }
  }

  

  function quietPlease() {
    $("#answer").stop().fadeOut();
    music.pause();
    synth.pause();
    music.currentTime = 0;
  }

  
  var client = new $.es.Client({
    hosts: 'localhost:9200'
  });
  var bg = document.querySelector('html');
  

  // RFID READER
  // $(document).keypress(function (ev) {

  //   if (ev.which > 38 && ev.which <= 57) {

  //     let v = ev.which - 48;

  //     if (startKeyStroke == false)
  //       keyStrokeInit(v);

  //     else {
  //       lastPress = new Date();
  //       lp = lastPress.getTime();
  //       let diff = lp - cp;
  //       if (diff < 150)
  //         keyStrokeValue += v;
  //       else {
  //         keyStrokeReset();
  //         keyStrokeInit(v);

  //       }
  //       console.log("diff lp - cp: ", diff);

  //       console.log("value: ", keyStrokeValue);
  //       console.log("currentPress: ", cp);
  //       console.log("lastPress: ", lp);
  //     }
  //   } else {
  //     if (ev.which == 13 && (keyStrokeValue.length == 10)) {
  //       catchKeyStroke(keyStrokeValue);
  //       console.log("Si tratta di un tag: ", keyStrokeValue);
  //     }
  //     keyStrokeReset();
  //     console.log("value not numeric", keyStrokeValue);

  //   }


  // });

  // function keyStrokeInit(v) {
  //   startKeyStroke = true;
  //   keyStrokeValue += v;
  //   console.log("value: ", keyStrokeValue);
  //   currentPress = new Date();
  //   cp = currentPress.getTime();
  //   console.log("current press time: ", cp);
  // }

  // function keyStrokeReset() {
  //   keyStrokeValue = "";
  //   startKeyStroke = false;
  //   cp = 0;
  //   keyStrokeValue = "";
  //   cp = 0;
  //   lp = 0;

  // }

  function checkRfidCode(value) {
    for(i in configurations){
      if(configurations[i].id == value){
        current_index = i;
        current_painting = configurations[i];
        restartAll();
        break;
      }
    }
    console.log("mypaints rilevato:", input);
  }

//input query field 

  $("#question").keydown(function (e) {
    e.stopPropagation();
  })

  $("#question").keypress(function (e) {
    userActivity = true;
    if (e.which == 13) {
      card = $(".card").attr("id");
      var tmpText = ($("#question").val()).toLowerCase();
      getResult(tmpText);
      $("#question").val('');
    }
    e.stopPropagation();
  });

  function tellMeTime() {
    let introduceH = "Sono le ore ";
    //let introduceM = " e ";
    let theDate = new Date();
    //let theTime = theDate.getTime();
    let hours = theDate.getHours();
    let minutes = theDate.getMinutes();

    let theTime = introduceH + hours + " e " /*+introduceM*/ + minutes + "minuti";

    speechText(theTime);
    showText(theTime)
    console.log("che ore sono: ", myMcoms["time"]);
  }

  recognition.onresult = function (event) {
    var last = event.results.length - 1;
    var text = event.results[last][0].transcript;
    $("#question").val(text)
    getResult(text);
  }

  function getResult(text) {

    //analyzer: 'my_synonyms',
    //q: query
    //must => AND / should => OR / must not => '!=' / filter as 'must' not scored
    var card2 = "controls";
    var card1 = "Pinacoteca";
    var card = current_painting.name;
    var query = "question:" + text + " AND title:" + card

    //temporary comment
    console.log('**** Current Title: =>>>> ' + card);
    console.log('**** Current Title: =>>>> ' + card1);
    console.log('**** Current Title: =>>>> ' + card2);

    //query / text
    console.log("query: ", query);
    console.log('Confidence: ' + text);
    client.search({
      index: 'myindex',
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
                    answer: {
                      query: text
                    }
                  }
                },
                {
                  match: {
                    key: {
                      query: text
                    }
                  }
                }/*,
              {
              match: {
              name: {
              query: text                                  }
            }
          }*/]
              }
            }, {
              bool: {
                must: [{
                  bool: {
                    should: [{
                      match: {
                        title: card//current title
                      }
                    }, {
                      match: {
                        title: card2//controls
                      }
                    }]
                  }
                }]
              }
            }]
          }
        }

      }
    }, function (error, response) {
      console.log("resp:", response);
      if (response.hits.total > 0) {
        //var answer = response.hits.hits[0]._source.answer;

        //check for internal commands
        if (response.hits.hits[0]._source.title == "controls") {
          processCommand(response.hits.hits[0]._source.answer);
          return;
        }

        var toSynthText = response.hits.hits[0]._source.answer; //+" Testo aggiunto.";

        var moreAsk = " Puoi chiedermi: ";
        console.log("toSynthText: ", toSynthText);
        console.log("**** KEY ****: ", response.hits.hits[0]._source.key);

        var suggests = response.hits.hits[0]._source.suggests;
        var suggestsValid  = 0;
        for (i in suggests) {
          if (askedNames[suggests[i].linkedName] == undefined){
            suggestsValid++;
            moreAsk += suggests[i].suggest + ";";
          }
        }

        if(suggestsValid > 0){
          toSynthText += moreAsk;
        }
        speechText(toSynthText);
        showText(toSynthText);

        var name = response.hits.hits[0]._source.name;
        if (askedNames[name] == undefined)
          askedNames[name] = 1;
        else
          askedNames[name]++;

      } else {
        //no answer found
        var message = grs(current_painting.messages.undef);
        speechText(message);
        showText(message);
      }

    });
  }

  recognition.onspeechend = function () {
    recognition.stop();
  }

  recognition.onnomatch = function (event) {
    console.log('I didnt recognise that color.');
  }

  recognition.onerror = function (event) {
    console.log('Error occurred in recognition: ' + event.error);
  }

});
