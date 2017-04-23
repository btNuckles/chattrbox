var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require ('./websockets-server');
var mime = require('mime');

var handleError = function(err, res) {
    res.writeHead(404);
    res.setHeader('Content-Type', 'text/html')
    res.end();
}
var server = http.createServer(function(req, res) {
    console.log('Responding to a request.');

    var filepath = extract(req.url);

    fs.readFile(filepath, function(err, data) {
        if (err) {
            handleError(err, res);
            return
        } else {
            res.setHeader('Content-Type', mime.lookup(filepath));
            res.end(data);
        }
    });
});
server.listen(3000);
