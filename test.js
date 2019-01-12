const request = require("request");
request.post(
    'http://localhost/event',
    {
        json: {
            "lat": 2,
            "long": 4,
            "name": "Test",
            "emoji": "Emoji",
            "category": "Tech"
        }
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
var options = {
    host: "localhost",
    path: "/going",

    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer token"
    }
}