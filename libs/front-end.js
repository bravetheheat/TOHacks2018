const express = require("express");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.port || 5000;
const bodyParser = require('body-parser');
const twitter = require("./twitter.js");
const cors = require("cors");

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log("connect");
});

app.post('/api', function (req, res) {
    console.log(req.body.keyword);
    res.send("Keyword received.");


});

io.on("connection", socket => {
    console.log("New client connected");
    io.emit("tweet", "tweet");
    socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports.emit = emit = function (identifier, data) {
    console.log(data);
    io.emit('tweet', data);
};