import * as WebSocket from 'ws';

export class MyWebSocket extends WebSocket {
    public isAlive?= false;
}
