import { AppState, Player } from './types/app_state';
import { Action } from 'redux';
import { DISCONNECT_MESSAGE } from './types/messages';

export const CONNECT_PLAYER = "ADD_PLAYER";
export const UPDATE_PLAYER = "UPDATE_PLAYER";
export const DISCONNECT_PLAYER = "DISCONNECT";

export interface UpdatePlayerAction extends Action {
    type: typeof UPDATE_PLAYER;
    player: Player;
}

export interface DisconnectAction extends Action {
    type: typeof DISCONNECT_PLAYER;
    event: Event;
    id: string;
}

export interface ConnectPlayerAction extends Action {
    type: typeof CONNECT_PLAYER;
}

export const updatePlayer = (player: Player) => {
    return {
        type: UPDATE_PLAYER,
        player: player
    } as UpdatePlayerAction;
}

export const disconnectPlayer = (id: string) => {
    return {
        type: DISCONNECT_PLAYER,
        id: id
    } as DisconnectAction
}

export const connectPlayer = (player: Player) => {
    return {
        type: CONNECT_PLAYER,
        player
    } as ConnectPlayerAction
}

const initialState = {
    isConnected: false,
    players: {},
    currentPlayerId: ""
} as AppState;
 

export const rootReducer = (state: AppState = initialState, action) => {
    switch(action.type){
        case (CONNECT_PLAYER):
            var x = 2
            return {
                ...state
            };
        case (UPDATE_PLAYER):
            var x = 2
            return {
                ...state
            };
        case (DISCONNECT_PLAYER):
            var x = 2;
            return {
                ...state
            }
        default:
            return {
                ...state
            }
    }
}