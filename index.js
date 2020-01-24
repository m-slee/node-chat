const express = require('express');
const app = express();
var server = require('http').createServer(app); //http
var io = require('socket.io')(server);
const path = require('path');
const PORT = process.env.PORT || 5000;

let chat = {
    test: "Join Chat"
}

let users = []
let chatrooms = {
    "General": [
        {"sender": "Welcome", "content": "Welcome to the general chatroom. Feel free to chat about anything."},
    ],
    "Questions": [
        {"sender": "Welcome", "content": "Ask questions here."},
    ],
    "Random": [
        {"sender": "Welcome", "content": "This chatroom is for random topics."},
    ],

}
let connections = []
// using ejs for template engine
app.set('view engine', 'ejs');
app.use("/static", express.static(path.join(__dirname, "public")));

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// home route
app.get('/', (req, res) => {
    res.render('home', {"chat": chat});
});

// enter chatrooms
app.post('/', (req, res) => {
    const submission = req.body.chatname;
    //res.send(submission);
    res.render('chat', {name:submission, chatrooms:chatrooms});
});

app.get('/room/:name', (req, res) => {
    const new_room = req.params.name;
    console.log(new_room);
    res.json(chatrooms[new_room]);
});
// socket.io events start here
  io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    // when a message is sent
    socket.on('chat message', function(msg, sender, current_room){
        let new_message = {
            "sender": sender,
            "content": msg
        }

        // add new message to current room
        chatrooms[current_room].push(new_message);
        io.emit('chat message', msg, sender);
        console.log('message: ' + msg + sender);
      });

      // user enters new chatroom
      /*
      socket.on('change room', function(current_room){
        io.emit('change room', chatrooms[current_room]);
        console.log("current room:" + chatrooms[current_room]  );
      });
      */
  });

server.listen(PORT, () => console.log('Server running on port 5000'));