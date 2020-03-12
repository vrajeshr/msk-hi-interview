var express = require("express");
var socket = require("socket.io");
var app = express();

server = app.listen(8080, () => {
  console.log("server is running on port 8080");
});

const io = socket(server);
const fs = require("fs");

let currentlyActiveUsers = [];
let messageList = [];
let messageNumber = 1;

let updateLocalStorage = () => {
  fs.writeFileSync(
    "./log.json",
    JSON.stringify({
      messages: messageList,
      savedID: messageNumber
    }),
    err => {
      if (err) {
        console.error(err);
        return;
      } else {
        console.log("Local file has been created");
      }
    }
  );
};

let retrieveLocalStorage = async () => {
  if (fs.existsSync("./log.json")) {
    storageInfo = await JSON.parse(fs.readFileSync("./log.json"));
    messageList = storageInfo.messages;
    messageNumber = storageInfo.savedID;
    return;
  } else {
    fs.writeFileSync("./log.json", [], err => {
      if (err) {
        console.err(err)
        return;
      }
    });
  }
};

retrieveLocalStorage();

io.on("connection", socket => {
  console.log("PING TO SERVER");

  socket.on('PING', () => {
    socket.emit('PONG', "Hello world!")
  })

  socket.on("USER_CONNECTED", data => {
    /*
      When user connects, check local storage for any data and set message list
      Then, add the unique socket ID to active users list
      Finally, emit the current active list & unique socket identifier       
    */
    console.log("USER HAS CONNECTED WITH NAME : ", data, socket.id);
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
    updateLocalStorage();
  });
});
