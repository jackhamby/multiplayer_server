
import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import { create } from 'domain';
import { AppState, Player } from './types/app_state';
import { Message, updateMessage, welcomeMessage, DISCONNECT_MESSAGE, UPDATE_PLAYER_MESSAGE } from './types/messages';
import { rootReducer, disconnectPlayer, updatePlayer } from './root_reducer';
import { createStore } from 'redux';
import { createPlayer } from './util/helpers';
const app = express();
const httpServer = http.createServer(app);
const io = socketIO(httpServer, {});
let store = createStore(rootReducer);

let state = {
    players: {},
    error: null,
    isConnected: true

} as AppState;

io.listen(3001);

setInterval( () => {
    io.sockets.emit("message", updateMessage(store.getState()))
}, 100)

const handleMessage = (message: Message) => {
    switch(message.type){
        case (DISCONNECT_MESSAGE):
            // console.log(`disconnect player ${message.data.id}`);
            store.dispatch(disconnectPlayer(message.data.id))
            break;
        case (UPDATE_PLAYER_MESSAGE):
            // console.log(`update player ${message.data.player.id}`);
            store.dispatch(updatePlayer(message.data.player))
            console.log(store.getState())
            break;
        default:
            break;
    }
}


io.on('connection', function(socket){    
    const newPlayer = createPlayer()   
    store.dispatch(updatePlayer(newPlayer));
    socket.send(welcomeMessage(newPlayer.id, store.getState()));
    // store.dispatch(upda)
    socket.on('message', message => {
        console.log(`message from client ${message}`)
        handleMessage(message);
    })

    socket.on('disconnect', event => {
        console.log('plater disconnect')
    })
});







    // try{
    //     state.players[id].x = x;
    //     state.players[id].y = y;
    //     console.log('\n');
    //     console.log(`updated player ${id}`);
    //     console.log('\n');
    //     const updatePlayerMessage = {
    //         type: UPDATE_PLAYER_MESSAGE,
    //         data: {
    //             id,
    //             x, 
    //             y
    //         } as UpdatePlayerData
    //     } as Message
    //     io.sockets.emit("message", updatePlayerMessage);
    //     return true
    // }
    // catch (error){
    //     console.log(error)
    //     return false;
    // }
