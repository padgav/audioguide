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

var messages = new Array();
var voices;


var synth = window.speechSynthesis;

var bg;

var card;

synth.onvoiceschanged = function() {
    voices = synth.getVoices();

};

$(document).ready(function() {
    
    recognition = new SpeechRecognition();
    speechRecognitionList = new SpeechGrammarList();
    recognition.grammars = speechRecognitionList;
    //recognition.continuous = true;
    recognition.lang = 'it-IT';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
        //var synth = window.speechSynthesis;



        messages[0] = "Non ho capito. Prova a ripetere.";
        messages[1] = "Benvenuto alla Pinacoteca Nazionale di Cagliari. Ti trovi davanti al retàblo del Presepio, e stai per toccare la tavola tàttiile che rappresenta la scena dell'adorazione dei pastori. La tavola raffigura la scena della natività. E' rappresentata una capanna, con apertura ad arco delineata da mattoni rosso chiaro, all’interno del quale sono presenti il bue e l’asinello, di fronte alla mangiatoia. La struttura è costituita da un solo ambiente, con ingresso frontale. Nella parte alta della capanna sono raffigurati  sei angeli che reggono un festone bianco, In basso a sinistra sono raffigurati in ginocchio in atto di adorazione la Madonna e San Giuseppe , ai loro piedi steso  sopra un lembo del mantello della madonna il Bambino rappresentato nudo con le braccia aperte. Nella zona opposta sono posizionati su tre livelli i tre pastori.  Puoi chiedermi altre informazioni facendomi delle domande";
        var controllerOptions = {};
        var c = 0;
        var controller = Leap.loop(controllerOptions, function(frame) {

        //console.log("frame hands length", frame.hands.length);

            if ((frame.hands.length > 0)){
                if (c == 0){
                    var utterThis = new SpeechSynthesisUtterance(messages[1]);
                    utterThis.voice = voices[2];
                    synth.speak(utterThis);
                    c = 1;
                }
                controller.disconnect();
                console.log("palmposition", frame.hands[0].palmPosition);
                var interactionBox = frame.interactionBox;
                var normalizedPosition = interactionBox.normalizePoint(frame.hands[0].palmPosition, true);
                console.log("normalizedPosition", normalizedPosition);
            }


        /*if (frame.pointables.length > 0) {
         console.log("type: ",frame.pointables[1].type);
         }*/
        })



    

    var client = new $.es.Client({
        hosts: 'localhost:9200'
    });

    var bg = document.querySelector('html');

    var card = "";


    
    


    // Handler for .ready() called.
    $(".card").on("click", function() {
        card = $(this).attr("id");
        $("#answer").html(card);
        beep();
        synth.cancel();
        recognition.start();
        //voices = synth.getVoices();
        c = 0;
        controller.connect();
    
    });
    $(".card").on("mouseenter", function() {
        if (card === $(this).attr("id"))
            return;
        card = $(this).attr("id");

        var utterThis = new SpeechSynthesisUtterance(card);
        utterThis.voice = voices[2];
        synth.speak(utterThis);
    });



    recognition.onresult = function(event) {
        var last = event.results.length - 1;
        var text = event.results[last][0].transcript;
        $("#question").html(text)
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
                $("#answer").html(response.hits.hits[0]._source.answer)
                var utterThis = new SpeechSynthesisUtterance(response.hits.hits[0]._source.answer);
                utterThis.voice = voices[2];
                synth.speak(utterThis);
                /*utterThis.onend = function(event) {
                    console.log("utterThis.onend");
                    recognition.start();
                }*/

                
                
                if (response.hits.hits[0]._source.link != undefined) {
                   // card = response.hits.hits[0]._source.link;
                    console.log(response.hits.hits[0]._source.link)
                }
            } else {
                var utterThis = new SpeechSynthesisUtterance(messages[0]);
                utterThis.voice = voices[2];
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
    }

});