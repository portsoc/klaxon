'use strict';

const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const app = express();

const extensions = ["html", "css", "js", "ico"];

app.use('/', express.static('static', { maxAge: 0, extensions: extensions }));
app.use('/', (req,res) => { res.sendFile(__dirname + '/static/wsclient.html'); });

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, (err) => console.log(err || 'ready'));

function newClient (ws) {
  ws.on('message', (data, flags) => {
    for (let client of wss.clients) {
      if (client != ws && client.readyState == WebSocket.OPEN) {
        client.send(data);
      }
    }
  });
}


const wss = new WebSocket.Server({server: server});
wss.on('connection', newClient);
