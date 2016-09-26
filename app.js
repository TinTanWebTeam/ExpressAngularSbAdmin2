const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');

// custom modules
const appConfig = require('./server/configs/app.config');
const database = require('./server/databases/mongodb.database');
const apiRoute = require('./server/routes/api.route');
const authRoute = require('./server/routes/auth.route');

// bootstrap app
let app = express();
let server = http.createServer(app);
let io = require('socket.io')(server);

// config app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(__dirname + '/public'));

app.use(function (req, res, next) {
    if (req.originalUrl.includes('api') || req.originalUrl.includes('auth')) {
        next();
    } else {
        res.sendFile(__dirname + '/public/index.html');
    }
});

// config route
app.use('/api', apiRoute);
app.use('/auth', authRoute);

// start server
server.listen(appConfig.port);

// io handle socket connect and event
let connections = [];
io.on('connection', function (socket) {
	// connected
    connections.push(socket);
    console.log('Connected: %s sockets connected!',connections.length);

    // disconnected
    socket.on('disconnect',function () {
    	connections.splice(connections.indexOf(socket),1);
    	console.log('Disconnected: %s sockets connected!',connections.length);
    });

    // handle send data event
    socket.on('client send data',function (data) {
    	io.sockets.emit('server send data',{
    		data: {
                message: 'Some client send to server a data and server return it back to client connected',
                data : data
            }
    	});
    });
});