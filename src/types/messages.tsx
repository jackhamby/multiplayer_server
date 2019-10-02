
import { AppState, Player } from './app_state';

export interface Message {
    type: string;
    data: any;
}

export const WELCOME_MESSAGE = "welcome";
export interface WelcomeData {
    id: string;
    state: AppState;
}

export const UPDATE_MESSAGE = "update";
export interface UpdateData {
    state: AppState
}

export const UPDATE_PLAYER_MESSAGE = "update_player";
export interface UpdatePlayerData {
    player: Player
}

export const DISCONNECT_MESSAGE = "disconnect";
export interface DisconnectData {
    id: string;
}

export const welcomeMessage = (id: string, state: AppState) : Message => {
    return {
        type: WELCOME_MESSAGE,
        data: {
            id,
            state
        } as WelcomeData
    }
}

export const updateMessage = (state: AppState) : Message => {
    return {
        type: UPDATE_MESSAGE,
        data: {
            state
        } as UpdateData
    }
}