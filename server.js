var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express(app);
var db = require('./db.js')
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

var now = moment();
app.use(express.static(__dirname+'/public'));

//clientInfo for taking care of people in room(key value pair) generated automatically
var clientInfo = {};
//sends curernt users to provided socket

function sendCurrentUsers(socket){
	var info = clientInfo[socket.id];
	var users = [];

	if(typeof info === 'undefined'){
		return;
	}
	//object.keys will take the given object and returns the array of all of the attributes
	Object.keys(clientInfo).forEach(function(socketId){
		var userInfo = clientInfo[socketId];

		if(info.room === userInfo.room){
			users.push(userInfo.name);
		}
	});
	socket.emit('message',{
		name: 'Systems',
		//join will take every element in array and converts into a string
		text: 'Current user: '+ users.join(', '),
		timeStamp: now.valueOf()
	})
};

io.on('connection', function(socket){
	console.log(now.format('hh:mm a ') +'user connected via socket.io!');
	
	//disconnect event is built-In socket.io event

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
	//join rooms, the req argument in the below function is the object of joinroom on app.js
	socket.on('joinRoom', function(req){
		clientInfo[socket.id]= req;//squre braces are used if the attribute name is dynamic
		socket.join(req.room);
		//built in method to tell socket.io library to add socket to a specific room
		//to method let us specify a particular room
		socket.broadcast.to(req.room).emit('message',{
			name: 'Systems',
			text: req.name + ' has joined',
			timeStamp: now.valueOf()
		});
	});
//this prints on console
	socket.on('message', function(message){
		//database for chat history
		db.chat.findOne({where: {name: message.name}}
		).then(function(chat){
			if(chat){

				db.sequelize.query("UPDATE chats SET message = message ||' '|| '"+message.text+"' WHERE name = '"+message.name+"'")
				console.log(chat.get('message') +' '+ message.text);
				
			}else{
				db.chat.create({
					name: message.name,
					phoneNumber: 123123432,
					message: message.text
				})
			}
		})

		console.log('Message received: '+ message.text);

		//check value of users
		if(message.text === '@currentUsers'){
			sendCurrentUsers(socket);
		}else{
			message.timeStamp = now.valueOf();
			io.to(clientInfo[socket.id].room).emit('message',message);
		};

		
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
db.sequelize.sync(
	//force:true
	).then(function(){
	http.listen(PORT, function(){
	console.log('server started')
	})
});

