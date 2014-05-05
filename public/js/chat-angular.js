var myChat = angular.module("MyChat", []);

myChat.controller(
    'LoginController',
    [
        '$scope',
        function($scope) {

        }
    ]
);

myChat.config(function($routeProvider) {
    $routeProvider.
        when('/login',
                {controller: "LoginController", templateUrl: 'login.html'}).
        when('/chat',
                {controller: "ChatController", templateUrl: 'chat.html'}).
        otherwise({redirectTo: '/login'});
});
////var socket = io.connect('/');
//
//socket.on('connect', function() {
//    console.log('Connected with socket.io');
//    init();
//});
//
//var init = function() {
//    $($nickname).on('keyup', function(e) {
//        var code = e.which || e.keyCode;
//        if (code === 13) {
//            setNickname($(this).val());
//        }
//    });
//    $chat.hide();
//};
//
//var setNickname = function(nickname) {
//    socket.emit('set_nickname', nickname, function(is_available) {
//        if (is_available) {
//            console.log('Nickname ' + nickname + ' is available.');
//            setUpChat(nickname);
//        } else {
//            console.log('Nickname ' + nickname + ' is not available.');
//        }
//    });
//};
//var setUpChat = function(nickname) {
//    $login.hide();
//    $welcome.hide();
//    $chat.show();
//    $submitMessage.click(function() {
//        sendMessage($message.val());
//    });
//    $($message).on('keyup', function(e) {
//        var code = e.which || e.keyCode;
//        if (code === 13) {
//            sendMessage($message.val());
//        }
//    });
//    socket.on('message', function(nickname, message) {
//        addMessage(nickname, message);
//    });
//};
//var sendMessage = function(msg) {
//    socket.emit('message', msg);
//};
//var addMessage = function(nickname, message) {
//    $messages.append($('<li>@' + nickname + ': ' + message + '</li>'));
//};
