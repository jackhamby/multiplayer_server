"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const application_1 = __importDefault(require("../../multiplayer_battle_arena/src/components/application/application"));
const app = express_1.default();
const httpServer = http_1.default.createServer(app);
const io = socket_io_1.default(httpServer);
io.listen(3001);
io.on('connection', function (socket) {
    console.log('a user asdasds');
    console.log(application_1.default);
    console.log('hot fuck');
    socket.on('message', message => {
        console.log(message);
        socket.send({ "name": "assfuck" });
    });
});
//# sourceMappingURL=app.js.map