// server.js

const WebSocket = require('ws');
const http = require('http');
const handleConnection = require('./handlers/connectionHandler');
const log = require('./logger');

const PORT = 8080;

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', handleConnection);

server.listen(PORT, () => {
  log(`Secure Chat WebSocket Server running on ws://localhost:${PORT}`);
});