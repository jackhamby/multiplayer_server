
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';


const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

io.listen(3001)

io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('message', message => {
        console.log(message)
        socket.send({"name" : "assfuck"})

    })
});

