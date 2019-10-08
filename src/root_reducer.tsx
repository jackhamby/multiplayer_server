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
    isConnected: true,
    players: {},
    currentPlayerId: ""
} as AppState;
 

export const rootReducer = (state: AppState = initialState, action) => {
    switch(action.type){
        case (CONNECT_PLAYER):
                console.log('\n')
                console.log('connect player hooked into reducer');
                console.log('\n')
            var x = 2
            return {
                ...state
            };
        case (UPDATE_PLAYER):
            console.log('\n')
            console.log('update player hooked into reducer');
            console.log(action.player)
            console.log('\n')
            var x = 2
            action.player.x += action.player.xVelocity;
            action.player.y += action.player.yVelocity;
            try{
                return {
                    ...state,
                    players:{
                        ...state.players,
                        [action.player.id] : action.player
                    }
                };
            }
            catch {
                return {
                    ...state
                }
            }
   
        case (DISCONNECT_PLAYER):
            console.log('\n')
            console.log('disconnect hooked into reducer');
            console.log(action.id)
            console.log('\n')
            delete state.players[action.id];
            return {
                ...state
            };
        default:
            return {
                ...state
            }
    }
}