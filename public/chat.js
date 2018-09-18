const socket = io();

// DOM elemt
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

function fnEnter (e){

	tecla = (document.all) ? e.keyCode : e.which;

  	if (tecla==13){

  		if (message.value && username.value) {

			socket.emit('chat:message',{
				username: username.value,
				message: message.value
			});
		}
  	}
}
//envio de mensaje
btn.addEventListener('click', function (){
	
	if (message.value && username.value) {

		socket.emit('chat:message',{
			username: username.value,
			message: message.value
		});	
	}
});



// anunciar a usuarios que se esta escribiendo mensaje.	
message.addEventListener('keypress', function (){
	
	socket.emit('chat:typing', username.value);

});


// anunciar a usuarios que se esta escribiendo mensaje.
message.addEventListener('onkeypress', function (){
	
	socket.emit('chat:typing', username.value);	
});

// Resibe el mensaje
socket.on('chat:message', function(data){
	actions.innerHTML =''; 
	output.innerHTML += `<p
			<strong>${data.username}</strong>: ${data.message}
		</p>`;

	message.value = '';
});

// anuncia que se esta escribiendo
socket.on('chat:typing', function(username){
	
	actions.innerHTML = `<p
			<em>${username} esta escribiendo...</em>
		</p>`;
});