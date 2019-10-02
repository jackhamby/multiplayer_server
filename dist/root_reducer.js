"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const initialState = {
    isConnected: false,
    players: {},
    currentPlayerId: ""
};
exports.rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case (exports.DISCONNECT_PLAYER):
            return state;
        case (exports.UPDATE_PLAYER):
            return state;
    }
};
//# sourceMappingURL=root_reducer.js.map