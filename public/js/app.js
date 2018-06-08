var socket = io();
var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Anonymous';
 
console.log(name +" has joined " + room);

//display room name
 jQuery('.room-title').text(room);


 socket.on('connect', function(){
 	console.log('connected to socket.io server');
 	socket.emit('joinRoom',{
 		name: name,
 		room: room
 	});
 });
//call back function has an argument which is the data server has sent
 socket.on('message', function(message){
 	var timeStampMoment = moment.utc(message.timeStamp);
 	console.log('New message');
 	console.log(message.text);
 	var timeStampMoment = moment.utc(message.timeStamp);
 	var $message = jQuery('.messages');
 	 //to select by class name we use periods
 	 $message.append('<p> <strong>'+message.name+' '+timeStampMoment.local().format('hh:mm a')+'</strong></p>');

 	 $message.append('<p>'+message.text+'</p>')
 	  });

 //send submitted data front-end

 var $form = jQuery('#message-form');

 $form.on('submit', function(event){
 	event.preventDefault();  //to take care of refreshing the page
 	
 	var $message = $form.find('input[name=message]');
 
 	socket.emit('message', {
 		name: name,
 		text: $message.val(),
 		 //selector of input tags using jquery function
 	 	//val functionis used to actually pull the value out and print it as a string
 	})

$message.val(" ");
 });
