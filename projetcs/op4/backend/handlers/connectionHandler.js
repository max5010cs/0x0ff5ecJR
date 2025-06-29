// handlers/connectionHandler.js

const log = require('../logger');
const { addToRoom, removeFromRoom, getPeers } = require('../rooms');

function handleConnection(ws, req) {
  let currentRoom = null;

  ws.on('message', (msg) => {
    try {
      const parsed = JSON.parse(msg);

      if (parsed.type === 'join') {
        currentRoom = parsed.room;
        addToRoom(currentRoom, ws);
        log(`Client joined room ${currentRoom}`);
      }

      else if (parsed.type === 'message' && currentRoom) {
        const peers = getPeers(currentRoom, ws);
        log(`Forwarding message to ${peers.length} peer(s) in room ${currentRoom}`);
        
        for (const peer of peers) {
          peer.send(JSON.stringify({
            type: 'message',
            data: parsed.data,
          }));
        }
      }

    } catch (err) {
      log('Error parsing message:', err);
    }
  });

  ws.on('close', () => {
    if (currentRoom) {
      const peers = getPeers(currentRoom, ws);
      for (const peer of peers) {
        try {
          peer.send(JSON.stringify({ type: 'peer-disconnected' }));
        } catch (e) {
          log('Failed to notify peer of disconnection');
        }
      }
      removeFromRoom(currentRoom, ws);
    }
    log('Client disconnected');
  });

  ws.on('error', (err) => {
    log('WebSocket error:', err);
  });
}

module.exports = handleConnection;