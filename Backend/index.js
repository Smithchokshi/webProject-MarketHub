const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');
const { dbConnection } = require('./config/config');
const authMiddleware = require('./Middleware/authMiddleware');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: 'http://localhost:3000',
});
require('dotenv').config();

dbConnection();

app.use(express.json());
app.use(cors());

app.use('/api/users', userRoute);
app.use('/api/chats', authMiddleware, chatRoute);
app.use('/api/message', authMiddleware, messageRoute);
app.get('/', (req, res) => {
  res.send('working');
});

let onlineUsers = [];

io.on('connection', socket => {
  console.log('New connection: ', socket.id);

  // listen to a connection

  socket.on('addNewUser', userId => {
    !onlineUsers.some(user => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });

    io.emit('getOnlineUsers', onlineUsers);
  });

  // add message
  socket.on('sendMessage', message => {
    const user = onlineUsers.find(cur => cur.userId === message.recipient.id);

    if (user) {
      io.to(user.socketId).emit('getMessage', message);
    }
  });

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(user => user.socketId !== socket.id);

    io.emit('getOnlineUsers', onlineUsers);
  });
});

const PORT = process.env.PORT || 5005;

server.listen(PORT, () => {
  console.log('Server is running', PORT);
});
