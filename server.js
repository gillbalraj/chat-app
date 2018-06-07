var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express(app);
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

var now = moment();
app.use(express.static(__dirname+'/public'));

io.on('connection', function(socket){
	console.log(now.format('hh:mm a ') +'user connected via socket.io!');
	socket.on('message', function(message){
		console.log('Message received: '+ message.text);
		message.timeStamp = now.valueOf();
		io.emit('message',message);
		//socket.broadcast.emit('message', message);
	});
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to my app', 
		timeStamp: now.valueOf()
	});
});
http.listen(PORT, function(){
	console.log('server started')
})
