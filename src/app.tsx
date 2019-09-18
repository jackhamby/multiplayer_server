
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

// temporary fix until i can import interface from another project
export interface AppState {
    players: Player[];
    error?: string;
}

export interface Player {
    ip: string;
    name: string;
    x: number;
    y: number;
}

const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer);

io.listen(3001)

io.on('connection', function(socket){
    console.log('a user asdasds');
    socket.on('message', message => {
        console.log(message)
        socket.send({"name" : "assfuck"})

    })
});

