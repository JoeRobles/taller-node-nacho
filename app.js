/**
 * Module dependencies.
 */
var express = require('express');

var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

var server = app.listen(3000);
var io = require('socket.io').listen(server);

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//app.use(express.favicon());
//app.use(express.logger('dev'));
//app.use(express.json());
//app.use(express.urlencoded());
//app.use(express.methodOverride());
//app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
//    app.use(express.errorHandler({dumpExceptions: true, showStack: true}));
}

app.get('/', routes.index);
app.get('/users', user.list);

io.sockets.on('connection', function(socket) {
    console.log('Client connected');
    socket.on('set_nickname', function(nickname, callback) {
        console.log('Trying to set nickname ' + nickname);
        var isAvailable = isNicknameAvailable(nickname);
        if (isAvailable)
            socket.nickname = nickname;
        callback(isAvailable);
        sendMessage('SERVER', 'User @' + nickname + ' has connected.');
    });
    socket.on('message', function(message) {
        sendMessage(socket.nickname, message);
    });
});

var sendMessage = function(nickname, message) {
    io.sockets.emit('message', nickname, message);
};

var isNicknameAvailable = function(nickname) {
    var clients = io.sockets.clients();
    for (var client in clients) {
        if (clients.hasOwnProperty(client)) {
            client = clients[client];
            console.log('io client.nickname: ' + client.nickname);
            if (client.nickname == nickname)
                return false;
        }
    }
    return true;
};
