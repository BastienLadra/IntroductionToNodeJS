const jwt = require('jsonwebtoken');
const http = require('http');
const TOKEN_SECRET = 'ILUVMONGOOSE';
var qs = require('querystring')


exports.veriftoken = function (req, res) {

    var token = req.headers['token'];

    jwt.verify(token, TOKEN_SECRET, (err, user) => {

        if (err) {
            res.statusCode = 500;
            res.end("500: Unauthorized Token")
        } else {
            return;
        }


    });
}
