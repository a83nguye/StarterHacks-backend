"use strict"
const express = require('express');
const app = express();
var http = require('http').Server(app);
const bodyParser = require('body-parser');
const io = require('socket.io')(http);
const data = new Map();
const detailedData = new Map();
let currentID = 0;
app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.log("new data request", Array.from(data.values()));
    res.send(Array.from(data.values()));
});
app.post('/info', (req, res) => {
    console.log(detailedData.get(req.body.id))
    res.send(detailedData.get(req.body.id));
})
app.post('/event', (req, res) => {
    console.log("got post!")
    const lat = req.body.lat;
    const long = req.body.long;
    const name = req.body.name;
    const emoji = req.body.emoji;
    const category = req.body.category;
    const startTime = req.body.time
    const description = req.body.description
    currentID++;
    data.set(currentID, {
        "id": currentID,
        "lat": lat,
        "long": long,
        "emoji": emoji
    })
    detailedData.set(currentID, {
        "id": currentID,
        "name": name,
        "category": category,
        "time": startTime,
        "description": description,
        "going": 1
    })
    sockets.forEach(socket => {
        console.log('emitting');
        socket.emit('event', detailedData.get(currentID));
    })
    res.send({ "id": currentID });
})
var sockets = [];
io.on('connection', function (socket) {
    sockets.push(socket);
    console.log('user connected');
    socket.on('disconnect', function () {
        var index = sockets.indexOf(socket);
        if (index !== -1) sockets.splice(index, 1);
    })
})
http.listen(3000, function () {
    console.log('listening on *:3000');
});
app.post('/going', (req, res) => {
    const eventID = req.body.id;
    const event = detailedData.get(eventID);
    if (!event) {
        res.sendStatus(404);
        return;
    }
    event.going++;
    detailedData.set(eventID, event);
    res.sendStatus(200);
});
app.post('/notgoing', (req, res) => {
    const eventID = req.body.id;
    const event = detailedData.get(eventID);
    if (!event) {
        res.sendStatus(404);
        return;
    }
    event.going--;
    detailedData.set(eventID, event);
    res.sendStatus(200);
});
app.post('/remove', (req, res) => {
    data.delete(req.body.id);
    detailedData.delete(req.body.id);
    res.sendStatus(200);
})
app.listen(80, () => console.log('Event app listening!'));