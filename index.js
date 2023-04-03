const express = require('express')
const path = require('path');
const app = express();
var livereload = require("livereload");
var connectLiveReload = require("connect-livereload");

app.use(express.static(__dirname + "/"));
app.use(connectLiveReload());

/* app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
}); */

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});

module.exports = app;