// rooms.js

const rooms = new Map(); // roomId -> Set of WebSocket clients
const log = require('./logger');

function addToRoom(roomId, client) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
  }
  rooms.get(roomId).add(client);
  log(`Client added to room ${roomId}. Total: ${rooms.get(roomId).size}`);
}

function removeFromRoom(roomId, client) {
  if (rooms.has(roomId)) {
    rooms.get(roomId).delete(client);
    log(`Client removed from room ${roomId}. Remaining: ${rooms.get(roomId).size}`);
    
    if (rooms.get(roomId).size === 0) {
      rooms.delete(roomId);
      log(`Room ${roomId} deleted`);
    }
  }
}

function getPeers(roomId, client) {
  if (!rooms.has(roomId)) return [];
  return [...rooms.get(roomId)].filter((c) => c !== client);
}

module.exports = {
  addToRoom,
  removeFromRoom,
  getPeers,
};