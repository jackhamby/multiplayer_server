"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
exports.WELCOME_MESSAGE = "welcome";
exports.REMOVE_PLAYER_MESSAGE = "remove_player";
exports.ADD_PLAYER_MESSAGE = "add_player";
exports.DISCONNECT_MESSAGE = "disconnect";
exports.UPDATE_PLAYER_MESSAGE = "update_player";
function create_UUID() {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
const io = socket_io_1.default(httpServer, {});
let state = {
    players: {},
    error: null
};
io.listen(3001);
const handleMessage = (message) => {
    // console.log(JSON.stringify(message))
    switch (message.type) {
        case (exports.DISCONNECT_MESSAGE):
            console.log(`disconnect player ${message.data.id}`);
            // console.log(message.data.id)
            removePlayer(message.data.id);
            break;
        case (exports.UPDATE_PLAYER_MESSAGE):
            console.log(`update player ${message.data.id}`);
            updatePlayer(message.data.id, message.data.x, message.data.y);
            break;
    }
};
const createPlayer = () => {
    const player = {
        id: create_UUID(),
        name: `player${state.players.length}`,
        x: 0,
        y: 0
    };
    return player;
};
const updatePlayer = (id, x, y) => {
    try {
        state.players[id].x = x;
        state.players[id].y = y;
        console.log('\n');
        console.log(`updated player ${id}`);
        console.log('\n');
        const updatePlayerMessage = {
            type: exports.UPDATE_PLAYER_MESSAGE,
            data: {
                id,
                x,
                y
            }
        };
        io.sockets.emit("message", updatePlayerMessage);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
const addPlayer = () => {
    try {
        const player = createPlayer();
        state.players[player.id] = player;
        const addPlayerMessage = {
            type: exports.ADD_PLAYER_MESSAGE,
            data: {
                id: player.id
            }
        };
        io.sockets.emit("message", addPlayerMessage);
        console.log('\n');
        console.log(`added player ${player.id}`);
        console.log('\n');
        return player.id;
    }
    catch (error) {
        console.log(error);
        return "";
    }
};
const removePlayer = (id) => {
    try {
        delete state.players[id];
        const removePlayerMessage = {
            type: exports.REMOVE_PLAYER_MESSAGE,
            data: {
                id: id
            }
        };
        console.log('\n');
        console.log(`removed player ${id}`);
        console.log('\n');
        io.sockets.emit("message", removePlayerMessage);
        return true;
    }
    catch (error) {
        console.log(error);
        return false;
    }
};
io.on('connection', function (socket) {
    // console.log('a user was added');
    const playerId = addPlayer();
    const welcomeMessage = {
        type: "welcome",
        data: {
            id: playerId,
            state: state
        }
    };
    socket.send(welcomeMessage);
    socket.on('message', message => {
        console.log(`message from client ${message}`);
        handleMessage(message);
    });
    socket.on('disconnect', event => {
        console.log('player disconnected');
        console.log(event);
    });
});
//# sourceMappingURL=app.js.map