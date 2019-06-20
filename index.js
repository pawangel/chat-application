const express = require('express')
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http)
const path = require('path')

app.use(express.static(__dirname))
app.get('/',(req, res)=>{
	res.sendFile(path.join(__dirname+'/index.html'));
})

io.on('connection', (socket)=>{
	console.log('a user connected')
	socket.on('chat message',(msg)=>{
		io.emit('chat message', msg)
	})

	socket.on('disconnect',()=>{
		console.log('user disconnected')
	})
})

http.listen(3000, ()=>{
	console.log('listening at 3000')
})