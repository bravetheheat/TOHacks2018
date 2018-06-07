import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:5000');

function socketio(cb) {
    socket.on("tweet", (data) => {
        cb(data);
    });
}

export {
    socketio
};