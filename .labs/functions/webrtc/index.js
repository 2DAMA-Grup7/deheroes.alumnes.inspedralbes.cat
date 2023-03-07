const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const port = process.env.WEBRTC_PORT;

const users = [];
const players = [];


server.listen(port, () => {
  console.log(`Server running at ${port}`);
});


io.on('connection', function(socket){
  socket.on('connection' , (data) => {
    if(players.length==0){
      console.log("Host Connected!");
      console.log(data.id);
      players[0] = data.id;
    }
    else{
      res = {id : players.length};
      console.log("P2 Connected")
      socket.broadcast.emit("getP2" , res);
    }
  })

  socket.on('movement', (data) => {
    console.log(data)
    for(i = 0; i <= players.length; i++){
      if(data.id==players[i]){
      socket.emit('playerMoved', data);}
    }
  })

  /*

  TODO: Retocar els disconects:  
  He fet un petit disconnect mes endevant, esta super mal fet ho hem de retocar
  
  
  socket.on('disconnectPlayer', (data) => {
    console.log("Player disconnected");
    for(i = 0; i <= players.length; i++){
      if(data.id==players[i]){
        players.splice(data.id , 1);
        if(players.length){
        for(i=0;i<=players.length; i++){
          Console.log("Current players"+players.length)
        }}
      }
    }
  })*/

  socket.on('disconnect' , function(socket) {
      console.log("Deleting playerInfo")
      players.splice(0,players.length);
  })


});



/*io.on("connection", (socket) => {
  socket.on("disconnect", () => {
    const index = users.findIndex((user) => user.id === socket.id);
    if (index !== -1) {
      socket.broadcast.emit("userDisconnected", users[index].name);
      console.log(`${users[index].name} has disconnected`);
      users.splice(index, 1);
    }
  });

  socket.on("setNick", (user) => {
    console.log(`User connected: ${user}`);
    socket.broadcast.emit("newUser", user);
    socket.emit("getUsers", users);
    users.push(new User(socket.id, user));
  });

  socket.emit('socketID', { id: socket.id });
  
  socket.on("userMessage", (data) => {
    socket.broadcast.emit("userMessage", data);
    socket.emit("userMessage", data);
  });
});

class User {
  constructor(id, name,x,y) {
    this.id = id;
    this.name = name;
    this.x=300 
    this.y=300 
  }
} */
