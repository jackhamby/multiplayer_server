import { AppState, Player } from '../types/app_state';

export const create_UUID = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}


export const createPlayer = (): Player => {
    const player = {
        id: create_UUID(),
        name: `player${Math.random() * 100}`,
        x: 0,
        y: 0,
        xVelocity: 0,
        yVelocity: 0
    } as Player;
    return player
}
