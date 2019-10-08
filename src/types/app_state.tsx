// temporary fix until i can import interface from another project
export interface AppState {
    players: {
        [key: string]: Player;
    }
    error?: string;
    isConnected: boolean;
}

export interface Player {
    id: string;
    name: string;
    x: number;
    y: number;
    xVelocity: number;
    yVelocity: number;
}