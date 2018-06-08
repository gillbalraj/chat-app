var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express(app);
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

var now = moment();
app.use(express.static(__dirname+'/public'));
//clientInfo for taking care of people in room
var clientInfo = {};

io.on('connection', function(socket){
	console.log(now.format('hh:mm a ') +'user connected via socket.io!');
	
	//disconnect event

	socket.on('disconnect', function(){
		var userData = clientInfo[socket.id];
		if(typeof userData !== 'undefined'){
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left',
				timeStamp: now.valueOf()
			});
			//delete the data from room if user left
			delete clientInfo[socket.id]
		}
	});
	//join rooms
	socket.on('joinRoom', function(req){
		clientInfo[socket.id]= req;//squre braces are used if the attribute name is dynamic
		socket.join(req.room);
		//built in method to tell socketio library to add socket to ths room
		socket.broadcast.to(req.room).emit('message',{
			name: 'Systems',
			text: req.name + ' has joined',
			timeStamp: now.valueOf()
		});
	});

	socket.on('message', function(message){
		console.log('Message received: '+ message.text);
		message.timeStamp = now.valueOf();
		io.to(clientInfo[socket.id].room).emit('message',message);
		//io.emit('message',message);
		//socket.broadcast.emit('message', message);
	});
	socket.emit('message', {
		name: 'System',
		room: 'Chat-Group',
		text: 'Welcome to my app', 
		timeStamp: now.valueOf()
	});
});
http.listen(PORT, function(){
	console.log('server started')
})
