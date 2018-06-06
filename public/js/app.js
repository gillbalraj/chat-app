var socket = io();
 socket.on('connect', function(){
 	console.log('connected to socket.io server');
 });
//call back function has an argument which is the data server has sent
 socket.on('message', function(message){
 	var timeStampMoment = moment.utc(message.timeStamp);
 	console.log('New message');
 	console.log(message.time+' '+message.text);
 	var timeStampMoment = moment.utc(message.timeStamp);
 	
 	 //to select by class name we use periods
 	 jQuery('.messages').append('<p> <strong>'+timeStampMoment.local().format('hh:mm a')+': '+'</strong>'+ message.text + '</p>') 
 });

 //send submitted data front-end

 var $form = jQuery('#message-form');

 $form.on('submit', function(event){
 	event.preventDefault();  //to take care of refreshing the page
 	
 	var $message = $form.find('input[name=message]');
 
 	socket.emit('message', {
 		text: $message.val(),
 		
 		 //selector of input tags using jquery function
 	 	//val functionis used to actually pull the value out and print it as a string
 	})

$message.val(" ");
 });
