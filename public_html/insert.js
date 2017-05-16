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
}, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});




var elasticsearch = require('elasticsearch');
var fs = require('fs');


var documents = JSON.parse(fs.readFileSync('data/reviews.json', 'utf8'));


var client = new elasticsearch.Client({
    host: 'localhost:9200',
    log: 'trace'
});


client.ping({
    requestTimeout: 30000,
}, function(error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});



var id = 0;
documents.reviews.map(function(doc) {
    console.log("title", doc.title);
    doc.qa.map(function(qa) {

        client.index({
            index: 'myindex',
            type: "mytype",
            //id: id++,
            body: {
                
                title: doc.title,
                question: qa.question,
                answer: qa.answer,
                link: qa.link
            }
        }, function(error, response) {
            // ...
            console.log("error", error);
        })
    })
})
