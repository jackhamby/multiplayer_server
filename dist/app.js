"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
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
    players: [],
    error: null
};
io.listen(3001);
io.on('connection', function (socket) {
    console.log('a user was added');
    const player = {
        id: create_UUID(),
        name: `player${state.players.length}`,
        x: 0,
        y: 0
    };
    const welcomeMessage = {
        type: "welcome",
        data: {
            id: player.id,
            state: state
        }
    };
    state.players.push(player);
    socket.send(welcomeMessage);
    socket.on('message', message => {
        console.log(`message from client ${message}`);
        // socket.send({"name" : "assfuck"});
    });
    socket.on('disconnect', event => {
        console.log('player disconnected');
    });
    console.log(state);
});
//# sourceMappingURL=app.js.map