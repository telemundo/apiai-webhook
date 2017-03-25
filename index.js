"use strict";

var restify = require('restify');

var server = restify.createServer({
    name: "telemundo"
});

server.use(restify.bodyParser());

server.post('/hook', function hook(req, res, next) {

    try {

        var speech = 'empty speech';

        if (req.body) {
            var requestBody = req.body;

            if (requestBody.result) {
                speech = '';

                if (requestBody.result.fulfillment) {
                    speech += requestBody.result.fulfillment.speech;
                    speech += ' ';
                }

                if (requestBody.result.action) {
                    speech += 'action: ' + requestBody.result.action;
                }
            }
        }

        res.send({
            speech: speech,
            displayText: speech,
            source: 'telemundo'
        });

    } catch (err) {

        res.send(400, {
            status: {
                code: 400,
                errorType: err.message
            }
        });

    }

    return next();
});

server.listen(process.env.PORT || 5000, function() {
    console.log('%s listening', server.name);
});