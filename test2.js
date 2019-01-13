const request = require("request");
request.post(
    'http://34.235.94.25/event',
    {
        json: { id: 2 },
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body)
            }
        }
    })