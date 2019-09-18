"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_client_1 = __importDefault(require("socket.io-client"));
// const socket = openSocket('http://localhost:3001');
// socket.emit('message', 1000);
// console.log('mouting')
class ConnectionManager {
    constructor() {
        this.isReady = false;
        this.socket = {};
    }
    connect() {
        this.socket = socket_io_client_1.default('http://localhost:3001');
        this.socket.send('hello something');
        // console.log('mouting')
        this.socket.on('message', (update) => {
            console.log('update sent with ');
            console.log(update);
        });
        // this.socket = new WebSocket(
        //     `${config.gameServerUrl}:${config.gameServerPort}`
        // );
        // this.socket.onerror = this.error.bind(this);
        // this.socket.onmessage = this.receive.bind(this);
        // this.socket.onclose =  this.close.bind(this);
        // this.socket.onopen = this.open.bind(this);
    }
    send(message) {
        this.socket.send(message);
    }
    receive(event) {
    }
    open(event) {
        console.log('opened connection');
        this.send('FUCK WAS');
    }
    error(event) {
        console.log(event);
        // throw('Failed to connect to game server.')
    }
    close(event) {
    }
}
exports.default = ConnectionManager;
//# sourceMappingURL=connection_manager.js.map