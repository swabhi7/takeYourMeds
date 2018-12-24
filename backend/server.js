var http = require('http');
var app = require('./app');

const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, '0.0.0.0');