const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const data = new Map();
let currentID = 0;
app.use(bodyParser.json());
app.get('/', (req, res) => {
    console.log(data.values())
    res.send(Array.from(data.values()));
});

app.post('/event', (req, res) => {
    console.log("got post!")
    const lat = req.body.lat;
    const long = req.body.long;
    const name = req.body.name;
    const emoji = req.body.emoji;
    const category = req.body.category;
    currentID++;
    data.set(currentID, {
        "id": currentID,
        "lat": lat,
        "long": long,
        "name": name,
        "emoji": emoji,
        "category": category,
        "going": 1
    })
    res.send({ "id": currentID });
})

app.post('/going', (req, res) => {
    const eventID = req.body.id;
    const event = data.get(eventID);
    if (!event) {
        res.sendStatus(404);
        return;
    }
    event.going++;
    data.set(eventID, event);
    res.sendStatus(200);
});
app.listen(80, () => console.log('Gator app listening on port 3000!'));