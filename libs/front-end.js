const express = require("express");
const path = require("path");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require('socket.io').listen(server);
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const twitter = require("./twitter.js");
const cors = require("cors");

server.listen(port, () => console.log(`Listening on port ${port}`));

app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../index.html'));
    console.log("connect");
});

app.post('/api', function (req, res) {
    console.log(req.body.keyword);
    let keyword = req.body.keyword;
    res.send("Keyword received.");
    let token = "twitter";
    twitter.scrape(keyword, token);


});

io.on("connection", socket => {
    console.log("New client connected");
    socket.on("disconnect", () => console.log("Client disconnected"));
});

module.exports = {
    emit: function (tweet,token) {
        io.emit("twitter", tweet);
        io.emit("tweet", tweet);
        console.log(tweet);
        console.log("data sent");
    }
}