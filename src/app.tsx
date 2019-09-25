
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

// temporary fix until i can import interface from another project
export interface AppState {
    players: Player[];
    error?: string;
}

export interface Player {
    id: string;
    name: string;
    x: number;
    y: number;
}

export interface Message {
    type: string;
    data: Object;
}

export interface WelcomeData {
    id: string;
    state: AppState;
}


function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {});

let state = {
    players: [],
    error: null

} as AppState;

io.listen(3001);

io.on('connection', function(socket){
    console.log('a user was added')
    
    const player = {
        id: create_UUID(),
        name: `player${state.players.length}`,
        x: 0,
        y: 0
    } as Player;

    const welcomeMessage = {
        type: "welcome",
        data: {
            id: player.id,
            state: state
        } as WelcomeData
    }

    state.players.push(player)

    socket.send(welcomeMessage);

    socket.on('message', message => {
        console.log(`message from client ${message}`)
        // socket.send({"name" : "assfuck"});
    })
    socket.on('disconnect', event => {
        console.log('player disconnected')
    })



    console.log(state)
});

