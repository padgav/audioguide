/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



var elasticsearch = require('elasticsearch');
var fs = require('fs');




var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});


client.ping({
  requestTimeout: 30000,
}, function (error) {
  if (error) {
    console.error('elasticsearch cluster is down!');
  } else {
    console.log('All is well');
  }
});

client.indices.delete({index: 'myindex'}, function(error){});


var settings = {
    analysis: {
      filter: {
        my_synonym_filter: {
          type: "synonym",
          synonyms: [
            "maria, madonna, vergine",
            "quadro, opera, dipinto",
            "angelo, arcangelo, gabriele"
          ]
        },
        italian_elision: {
          "type": "elision",
          "articles": [
                "c", "l", "all", "dall", "dell",
                "nell", "sull", "coll", "pell",
                "gl", "agl", "dagl", "degl", "negl",
                "sugl", "un", "m", "t", "s", "v", "d"
          ]
        },
        italian_stop: {
          "type":       "stop",
          "stopwords":  "_italian_" 
        },
        italian_keywords: {
          "type":       "keyword_marker",
          "keywords":   ["esempio"] 
        },
        italian_stemmer: {
          "type":       "stemmer",
          "language":   "light_italian"
        }
      },
      char_filter: { 
        quotes: {
          type: "mapping",
          mappings: [ 
            "\\u0091=>\\u0027",
            "\\u0092=>\\u0027",
            "\\u2018=>\\u0027",
            "\\u2019=>\\u0027",
            "\\u201B=>\\u0027"
          ]
        }
      },
      analyzer: {
        my_synonyms: {
          tokenizer: "standard",
          filter: [
            "lowercase",
            "my_synonym_filter",
            "italian_elision",
            "italian_stop",
            "italian_keywords",
            "italian_stemmer"
          ],
          char_filter: [ "quotes" ]
        }
      }
    }
  };
  
  var mappings ={
      mytype: {
      properties: {
        question: { 
          type: "string",
          analyzer: "my_synonyms"
          
        },
        answer:{
          type: "string",
          analyzer: "my_synonyms"
        },
        title:{
          "type": "string",
            "index": "not_analyzed"        
          
        }
      }
    }
      
      
  };

client.indices.create({
        index: 'myindex',
        body:{
        settings: settings,
        mappings: mappings
}

}, function(error, response){
console.log(error)
});



