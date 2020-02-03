
const express = require("express");

//const favicon = require('express-favicon');
//app.use(favicon(__dirname + '/public/favicon.ico'));

const app = express();
//app.use(express.static('public'));

app.use(express.static(__dirname /*+ '/public_html'*/));
const port = 3000;
//const ip = "127.0.0.1"
const ip = "0.0.0.0";


app.get("/", function(req, res)
{
 //res.send("Hi!");
 res.sendFile(__dirname + "/index.html");

})

const server = app.listen(port, ip, function()
{
 console.log("Server started on "+ip+":"+port);
})
