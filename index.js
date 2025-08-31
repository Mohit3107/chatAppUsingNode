const http = require('node:http');
const express = require('express')
const path = require('node:path')
const socketIo = require('socket.io')



const hostname = '127.0.0.1';
const port = 3000;

// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World from Nodfgdfe.js!\n');
// });

const app = express();
const httpServer = http.createServer(app)

// passing our http(browser) server instance to SocketIo server to get socket object or instance
const io = new socketIo.Server(httpServer)

// Auto invokes when client is connected (means lib loaded at client(index.html file) i.e socket.io.js)
io.on('connection',(socket)=>{
    // io.emit('chat_msg',(msg)=>{
    //     console.log("Welcom to realtime chat app");
    // })
    socket.on('chat_msg',(msg)=>{
        console.log("Client Response: "+msg);
       //io.emit("chat_msg",msg);  // to send all including the sender
       socket.broadcast.emit('chat_msg',msg)
    })
    // console.log('Connection Established..');
    socket.on('disconnect',()=>{
        io.emit("chat_msg","One of the client is now disconnected..."); // for all
        console.log('Disconnected...')
    })

})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,"index.html"))
    //  res.send(path.join(__dirname,"index"))
});


httpServer.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;