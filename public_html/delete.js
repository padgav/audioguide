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

client.indices.delete({index: 'myindex'});




var settings = {
    analysis: {
      filter: {
        my_synonym_filter: {
          type: "synonym",
          synonyms: [
            "Maria,Madonna,Vergine",
            "quadro,opera,dipinto",
            "angelo,arcangelo,gabriele"
          ]
        }
      },
      analyzer: {
        my_synonyms: {
          tokenizer: "standard",
          filter: [
            "lowercase",
            "my_synonym_filter"
          ]
        }
      }
    }
  };

client.indices.create({
        index: 'myindex',
        body:{
        settings: settings
}

}, function(error, response){
console.log(error)
});
