"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const messages_1 = require("./types/messages");
const root_reducer_1 = require("./root_reducer");
const redux_1 = require("redux");
const helpers_1 = require("./util/helpers");
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
const io = socket_io_1.default(httpServer, {});
let store = redux_1.createStore(root_reducer_1.rootReducer);
let state = {
    players: {},
    error: null,
    isConnected: true
};
io.listen(3001);
setInterval(() => {
    io.sockets.emit("message", messages_1.updateMessage(store.getState()));
}, 100);
const handleMessage = (message) => {
    switch (message.type) {
        case (messages_1.DISCONNECT_MESSAGE):
            // console.log(`disconnect player ${message.data.id}`);
            store.dispatch(root_reducer_1.disconnectPlayer(message.data.id));
            break;
        case (messages_1.UPDATE_PLAYER_MESSAGE):
            // console.log(`update player ${message.data.player.id}`);
            store.dispatch(root_reducer_1.updatePlayer(message.data.player));
            console.log(store.getState());
            break;
        default:
            break;
    }
};
io.on('connection', function (socket) {
    const newPlayer = helpers_1.createPlayer();
    store.dispatch(root_reducer_1.updatePlayer(newPlayer));
    socket.send(messages_1.welcomeMessage(newPlayer.id, store.getState()));
    // store.dispatch(upda)
    socket.on('message', message => {
        console.log(`message from client ${message}`);
        handleMessage(message);
    });
    socket.on('disconnect', event => {
        console.log('plater disconnect');
    });
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
//# sourceMappingURL=app.js.map