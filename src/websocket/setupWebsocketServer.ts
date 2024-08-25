import http from 'http';
import { WebSocketServer } from 'ws';

type Args = {
  server: http.Server;
};

const setupWebsocketServer = ({ server }: Args) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (stream) => {
    stream.on('error', (err) => {
      console.error('An error occurred in ws:', err);
    });

    stream.on('message', (data) => {
      console.log('received: %s', data);
    });

    stream.send('test');
  });
};

export default setupWebsocketServer;
