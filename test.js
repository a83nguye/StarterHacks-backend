const request = require("request");
request.post(
    'http://34.235.94.25/event',
    {
        json: {
            "lat": 43.472286,
            "long": -80.544861,
            "name": "Test Data",
            "emoji": "Emoji",
            "category": "Tech",
            "time": new Date().toISOString(),
            "description": "Teeeeeeeeeeeeeeeeeeeeeest dataaaaaaaaaaaaaaaaa"
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