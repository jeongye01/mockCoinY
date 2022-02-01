const webSocketsServerPort = 3000;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
export const wsServer = new webSocketServer({
  httpServer: server,
});
