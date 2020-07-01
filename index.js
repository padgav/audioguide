
const express = require("express");
var cors = require('cors')

var fs = require('fs');
var logger;




//const favicon = require('express-favicon');
//app.use(favicon(__dirname + '/public/favicon.ico'));

const app = express();
//app.use(express.static('public'));

/**bodyParser.json(options)
* Parses the text as JSON and exposes the resulting object on req.body.
*/
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var corsOptions = {
  origin: 'http://localhost:9200',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}



app.use(express.static(__dirname /*+ '/public_html'*/));
const port = 3000;
//const ip = "127.0.0.1"
const ip = "0.0.0.0";


app.get("/",cors(corsOptions), function(req, res)
{
  //res.send("Hi!");
  res.sendFile(__dirname + "/index.html");

})

// Creates logs folder.
fs.mkdir('logs', { recursive: true }, (err) => {
  if (err) throw err;
});

app.post("/log", function(req, res)
{
  console.log(req.body);

  if(req.body.data.cmd == "restart"){
    if(logger != undefined) logger.close();
    var millis = req.body.millis;
    var filename = "logs/" + millis;



    logger = fs.createWriteStream(filename, {
      flags: 'a' // 'a' means appending (old data will be preserved)
    })
  }

  logger.write(JSON.stringify(req.body)+"\n") ;
  res.send("OK");

})

const server = app.listen(port, ip, function()
{
  console.log("Server started on "+ip+":"+port);
})
