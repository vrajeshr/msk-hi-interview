var express = require("express");
var socket = require("socket.io");
var app = express();

server = app.listen(8080, function() {
  console.log("Server is running on port 8080");
});

const io = socket(server);

let currentlyActiveUsers = [];
let messageList = [];
let messageNumber = 1;

io.on("connection", socket => {
  console.log("PING TO SERVER");

  socket.on("USER_CONNECTED", data => {
    /*
      When use connects, add the unique socket ID to active users list
      Finally, emit the current active list & unique socket identifier       
    */
   console.log("USER HAS CONNECTED WITH NAME & ID : ", data, socket.id);
    currentlyActiveUsers.push({
      user: data.connectedUser,
      id: socket.id
    });

    io.emit("CHATROOM_UPDATE", currentlyActiveUsers, socket.id);
    io.emit("MESSAGE_LIST_UPDATE", messageList);

    console.log("Active users", currentlyActiveUsers);
  });

  socket.on("MESSAGE_SENT", message => {
    /*
      When a socket (client) sends a message to the server store it to a 
      message buffer and emit new message chat log.
      Also, update local storage with new chat log. 
      (In the event that the server disconnects, save the messages on each sent message.)
    */
    messageNumber += 1;
    messageList.push({
      ...message,
      messageID: messageNumber
    });
    io.emit("MESSAGE_LIST_UPDATE", messageList);
  });

  socket.on("disconnect", () => {
    /* 
      On disconnect, remove socket ID from active user list
    */
    console.log("USER HAS DISCONNECTED", socket.id);
    
    currentlyActiveUsers = currentlyActiveUsers.filter( (item) => {
      return item.id != socket.id
    })
    
    io.emit("CHATROOM_UPDATE", currentlyActiveUsers);
    io.emit("MESSAGE_LIST_UPDATE", messageList);
  });
});
