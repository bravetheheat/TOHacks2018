const express = require("express");
const cors = require("cors");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.port || 3000;
const bodyParser = require('body-parser');

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
    console.log("connect");
});

app.post('/api', function (req, res) {
    let keyword = req.body.keyword;
    

    res.send("Keyword received.");
    console.log("REQUESTED");
    console.log(req.body);


});

io.on("connection", socket => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports = {
    emit: function (tweet) {
        io.emit("tweet", tweet);
    }
}