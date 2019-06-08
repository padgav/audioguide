//console.log('ciao');

const express = require("express");

//const favicon = require('express-favicon'); 
//app.use(favicon(__dirname + '/public/favicon.ico'));

const app = express();
//app.use(express.static('public'));

app.use(express.static(__dirname /*+ '/public_html'*/));
const port = 3000;
//const ip = "127.0.0.1"
const ip = "0.0.0.0";

var settings = require('./conf/msg_conf.json');
console.log("Da Require: ", settings); // ['nodejs', 'javascript']
// Read Synchrously

const obj_json = require('./conf/msg_conf.json');
console.log("da express", obj_json.name); 
// Define JSON File
 var fs = require("fs");
 console.log("\n *STARTING* \n");
// Get content from file
 var contents = fs.readFileSync("./conf/msg_conf.json");
// Define to JSON type
 const jsonContent = JSON.parse(contents);
// Get Value from JSON
 console.log("welcome:", jsonContent.welcome);
 console.log("undef:", jsonContent.undef);
 console.log("touching:", jsonContent.touching);
//log("\n *EXIT* \n");



app.get("/", function(req, res)
{
 //res.send("Hi!");
 res.sendFile(__dirname + "/index.html");

})

/*
app.get("/test", function(req, res)
{
  res.sendFile(__dirname + "/log.php");
})
*/
const server = app.listen(port, ip, function()
{
 console.log("Server started on "+ip+":"+port);
})
