const http = require('http');
const WebSocket = require('ws');
const {
  addClientToRoom,
  getPeer,
  removeClient
} = require('./rooms');

const port = process.env.PORT || 3001;
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('ShadowTalk WebSocket server is running');
}); // needed for webscket on cloud hosts
const wss = new WebSocket.Server({ server });

console.log(`[SERVER] Starting WebSocket server...`);

server.listen(port, () => {
  console.log(`[SERVER] Listening on port ${port}`);
});

wss.on('connection', (ws) => {
  let currentRoom = null;

  console.log('[SERVER] New client connected');

  ws.on('message', (msg) => {
    let data;
    try {
      data = JSON.parse(msg);
    } catch (err) {
      console.error('[ERROR] Invalid JSON:', msg);
      return;
    }

    if (data.type === 'join') {
      const { roomId } = data;
      if (!roomId) return;

      addClientToRoom(roomId, ws);
      currentRoom = roomId;
      console.log(`[SERVER] Client joined room: ${roomId}`);
    }

    if (data.type === 'message') {
      const { roomId, payload } = data;
      if (!roomId || !payload) return;

      console.log(`[SERVER] Received message in room ${roomId}:`, payload);

      const peer = getPeer(roomId, ws);
      if (peer && peer.readyState === WebSocket.OPEN) {
        peer.send(JSON.stringify({
          type: 'message',
          payload
        }));
        console.log(`[SERVER] Relayed message to peer in room ${roomId}`);
      } else {
        console.warn(`[SERVER] No available peer to relay message in room ${roomId}`);
      }
    }
  });

  ws.on('close', () => {
    console.log(`[SERVER] Client disconnected from room: ${currentRoom}`);
    if (currentRoom) {
      removeClient(currentRoom, ws);
    }
  });
});
