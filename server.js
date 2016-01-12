//Build Server
var express = require("express");
var app = express();
var http = require('http').Server(app);
var port = 3700;
//Mods
var io = require('socket.io')(http);

//Send To FrontEnd
app.get("/", function(req, res){
  res.sendFile(__dirname + '/dist/index.html');
});

app.use(express.static('./dist/assets'));

//Start HTTP
http.listen(port, function(){
  console.log('listening on *:' + port);
});