

const rooms = new Map(); // room id, set of clients

function createRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, new Set());
    console.log(`[ROOM] Created: ${roomId}`);
  }
}

function addClientToRoom(roomId, client) {
  createRoom(roomId);
  const clients = rooms.get(roomId);
  clients.add(client);
  console.log(`[ROOM] ${roomId}: Client joined (${clients.size}/2)`);

  return clients;
}

function getPeer(roomId, client) {
  const clients = rooms.get(roomId);
  if (!clients) return null;
  for (const c of clients) {
    if (c !== client) return c;
  }
  return null;
}

function removeClient(roomId, client) {
  const clients = rooms.get(roomId);
  if (!clients) return;
  clients.delete(client);
  console.log(`[ROOM] ${roomId}: Client left (${clients.size}/2)`);

  if (clients.size === 0) {
    rooms.delete(roomId);
    console.log(`[ROOM] ${roomId}: Destroyed`);
  }
}

module.exports = {
  createRoom,
  addClientToRoom,
  getPeer,
  removeClient
};
