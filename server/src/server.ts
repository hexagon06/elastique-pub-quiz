import * as express from 'express';
import { createServer as createHttpServer } from 'http';
import { AddressInfo, Server as WebSocketServer } from 'ws';
import { MyWebSocket } from './MyWebSocket';

const app = express();
//initialize a simple http server
const server = createHttpServer(app);
//initialize the WebSocket server instance
const wss = new WebSocketServer({ server });

// only keep a stack of 10 messages on the server
const messages: string[] = [];

function messagesAsString(): string {
  let update = 'messages:\r\n';
  messages.forEach(m => update = `${update}update: ${m}\r\n`);
  return update;
}

wss.on('connection', (ws: MyWebSocket) => {
  ws.isAlive = true;
  console.log('new connection');

  ws.on('pong', () => {
    console.log('pong');
    ws.isAlive = true;
  });

  //connection is up, let's add a simple simple event
  ws.on('message', (message: string) => {
    //log the received message and send it back to the client
    console.log(`received: ${message}`);
  });

  ws.on('close', () => {
    console.log('closed');
  });
});

setInterval(() => {
  wss.clients.forEach((ws: MyWebSocket) => {

    if (!ws.isAlive) {
      console.log('terminate');
      return ws.terminate();
    }

    console.log('ping');
    ws.isAlive = false;
    ws.ping(null, false);
  });
}, 5000);

function isAddressInfo(obj: any): obj is AddressInfo {
  const ai = obj as AddressInfo;
  return ai.address !== null && ai.family != null && ai.port !== null;
}
//start our server
server.listen(process.env.PORT || 8999, () => {
  const adresInfo = server.address()
  if (adresInfo && isAddressInfo(adresInfo)) {
    console.log(`Server started on port ${adresInfo.port} :)`);
  }
});
