"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WELCOME_MESSAGE = "welcome";
exports.UPDATE_MESSAGE = "update";
exports.UPDATE_PLAYER_MESSAGE = "update_player";
exports.DISCONNECT_MESSAGE = "disconnect";
exports.welcomeMessage = (id, state) => {
    return {
        type: exports.WELCOME_MESSAGE,
        data: {
            id,
            state
        }
    };
};
exports.updateMessage = (state) => {
    return {
        type: exports.UPDATE_MESSAGE,
        data: {
            state
        }
    };
};
//# sourceMappingURL=messages.js.map