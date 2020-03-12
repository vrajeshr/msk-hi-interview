var express = require("express");
var socket = require("socket.io");
var app = express();

server = app.listen(8080, function() {
  console.log("Server is running on port 8080");
});

const io = socket(server);

let currentlyActiveUsers = [];

io.on("connection", socket => {
  console.log("PING TO SERVER");

  socket.on("USER_CONNECTED", data => {
    /*
      When user connects, add user's socket ID to active users with the name
      Then, add the unique socket ID to active users list
      Finally, emit the current active list & unique socket identifier       
    */
    console.log("USER HAS CONNECTED WITH NAME & ID : ", data, socket.id);

    currentlyActiveUsers.push({
      user: data.connectedUser,
      id: socket.id
    });

    console.log("Active users", currentlyActiveUsers);
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
  });
});
