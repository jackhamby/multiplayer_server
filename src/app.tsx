
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { create } from 'domain';

// temporary fix until i can import interface from another project
export interface AppState {
    players: {
        [key: string]: Player;
    }
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
    data: any;
}

export const WELCOME_MESSAGE = "welcome";

export const REMOVE_PLAYER_MESSAGE = "remove_player";

export const ADD_PLAYER_MESSAGE = "add_player";

export const DISCONNECT_MESSAGE = "disconnect";

export const UPDATE_PLAYER_MESSAGE = "update_player"

export interface UpdatePlayerData {
    id: string;
    x: number;
    y: number;
}

export interface WelcomeData {
    id: string;
    state: AppState;
}

export interface DisconnectData {
    id: string;
}
export interface RemovePlayerData {
    id: string
}

export interface AddPlayerData {
    id: string,
    x: number,
    y: number,
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
    players: {},
    error: null

} as AppState;

io.listen(3001);

const handleMessage = (message: Message) => {
    // console.log(JSON.stringify(message))
    switch(message.type){
        case (DISCONNECT_MESSAGE):
            console.log(`disconnect player ${message.data.id}`);
            // console.log(message.data.id)
            removePlayer(message.data.id)
            break;
        case (UPDATE_PLAYER_MESSAGE):
            console.log(`update player ${message.data.id}`);
            updatePlayer(message.data.id, message.data.x, message.data.y);
            break;
    }

}

const createPlayer = (): Player => {
    const player = {
        id: create_UUID(),
        name: `player${state.players.length}`,
        x: 0,
        y: 0
    } as Player;
    return player

}

const updatePlayer = (id: string, x: number, y: number): boolean=> {
    try{
        state.players[id].x = x;
        state.players[id].y = y;
        console.log('\n');
        console.log(`updated player ${id}`);
        console.log('\n');
        const updatePlayerMessage = {
            type: UPDATE_PLAYER_MESSAGE,
            data: {
                id,
                x, 
                y
            } as UpdatePlayerData
        } as Message
        io.sockets.emit("message", updatePlayerMessage);
        return true
    }
    catch (error){
        console.log(error)
        return false;
    }
}


const addPlayer = (): string => {
    try{
        const player = createPlayer();
        state.players[player.id] = player
        const addPlayerMessage = {
            type: ADD_PLAYER_MESSAGE,
            data: {
                id: player.id
            } as AddPlayerData
        } as Message
        io.sockets.emit("message", addPlayerMessage);
        console.log('\n');
        console.log(`added player ${player.id}`);
        console.log('\n');
        return player.id;
    }
    catch(error){
        console.log(error)
        return "";
    }
}

const removePlayer = (id: string): boolean => {
    try {
        delete state.players[id];
        const removePlayerMessage = {
            type: REMOVE_PLAYER_MESSAGE,
            data: {
                id: id
            } as RemovePlayerData
        }
        console.log('\n');
        console.log(`removed player ${id}`);
        console.log('\n');

        io.sockets.emit("message", removePlayerMessage);
        return true;

    }
    catch (error){
        console.log(error)
        return false
    }
}


io.on('connection', function(socket){
    // console.log('a user was added');
    
    const playerId = addPlayer();
    
    const welcomeMessage = {
        type: "welcome",
        data: {
            id: playerId,
            state: state
        } as WelcomeData
    } 

    socket.send(welcomeMessage);

    socket.on('message', message => {
        console.log(`message from client ${message}`)
        handleMessage(message);
    })

    socket.on('disconnect', event => {
        console.log('player disconnected');
        console.log(event)
    })
});

