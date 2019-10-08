"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CONNECT_PLAYER = "ADD_PLAYER";
exports.UPDATE_PLAYER = "UPDATE_PLAYER";
exports.DISCONNECT_PLAYER = "DISCONNECT";
exports.updatePlayer = (player) => {
    return {
        type: exports.UPDATE_PLAYER,
        player: player
    };
};
exports.disconnectPlayer = (id) => {
    return {
        type: exports.DISCONNECT_PLAYER,
        id: id
    };
};
exports.connectPlayer = (player) => {
    return {
        type: exports.CONNECT_PLAYER,
        player
    };
};
const initialState = {
    isConnected: true,
    players: {},
    currentPlayerId: ""
};
exports.rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case (exports.CONNECT_PLAYER):
            console.log('\n');
            console.log('connect player hooked into reducer');
            console.log('\n');
            var x = 2;
            return Object.assign({}, state);
        case (exports.UPDATE_PLAYER):
            console.log('\n');
            console.log('update player hooked into reducer');
            console.log(action.player);
            console.log('\n');
            var x = 2;
            action.player.x += action.player.xVelocity;
            action.player.y += action.player.yVelocity;
            try {
                return Object.assign(Object.assign({}, state), { players: Object.assign(Object.assign({}, state.players), { [action.player.id]: action.player }) });
            }
            catch (_a) {
                return Object.assign({}, state);
            }
        case (exports.DISCONNECT_PLAYER):
            console.log('\n');
            console.log('disconnect hooked into reducer');
            console.log(action.id);
            console.log('\n');
            delete state.players[action.id];
            return Object.assign({}, state);
        default:
            return Object.assign({}, state);
    }
};
//# sourceMappingURL=root_reducer.js.map