const path = require('path');
const express = require('express');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);

// start server
const server = app.listen('8080',() => {
	console.log('Server on port:', app.get('port'));
});

// static file 
app.use(express.static(path.join(__dirname + '/public')));

// Websockets
const SocketIO = require('socket.io');
const io = SocketIO(server);

io.on('connection', (socket) => {

	socket.on('chat:message', (data) =>{
		io.sockets.emit('chat:message', data);
	});

	socket.on('chat:typing', (username) =>{

		socket.broadcast.emit('chat:typing',username);
		
	});
});


