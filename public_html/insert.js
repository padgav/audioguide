/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var elasticsearch = require('elasticsearch');
var fs = require('fs');


var documents = JSON.parse(fs.readFileSync('data/reviews.json', 'utf8'));


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

//client.indices.delete({index: 'myindex'});

var id = 0;
documents.reviews.map(function(doc){
console.log("title", doc.title);

client.create({
  index: 'myindex',
  type: 'mytype',
  id: id++,
  body: {
    // put the partial document under the `doc` key
    doc: doc
  }
}, function (error, response) {
  // ...
        console.log("error", error);
})

})