var express = require('express');

var routes = require('./routes');
var user = require('./routes/user');
var angular = require('./routes/angular');
var http = require('http');
var path = require('path');

var app = express();
var port = 3000;
var server = app.listen(port);
var io = require('socket.io').listen(server);
app.set('port', process.env.PORT || port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', routes.index);
app.get('/users', user.list);
app.get('/angular', angular.angular);

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
            if (client.nickname === nickname) {
                return false;
            }
        }
    }
    return true;
};