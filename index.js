const server = require('http').createServer()
const io = require('socket.io')(server)

io.on("connection", socket => {
    console.log("onConnection", socket.id, socket.connected);
  
    socket.on("disconnect", () => {
        console.log("onDisconnect");
    });
});
  
server.listen(3000, () => {
    console.log('listening on *:3000');
});



