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



client.search({
  index: 'myindex',
  q: 'body:Vegrine~'
}, function (error, response) {
        console.log("resp:",response);
});
