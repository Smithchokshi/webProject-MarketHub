const express = require('express');
const cors = require('cors');
<<<<<<< HEAD
=======
const http = require('http');
const socketIO = require('socket.io');
>>>>>>> development
const { dbConnection } = require('./config/config');
const authMiddleware = require('./Middleware/authMiddleware');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');
<<<<<<< HEAD

const cardRoute = require('./Routes/cardRoute');

const app = express();
=======
const productRoute = require('./Routes/productRoute');
const contactusRoute = require('./Routes/contactUsRoute');
const likesRoute = require('./Routes/likesRoute');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: process.env.FRONTEND_URL,
});
>>>>>>> development
require('dotenv').config();

dbConnection();

app.use(express.json());
app.use(cors());
<<<<<<< HEAD

app.use('/api/users', userRoute);
app.use('/api/chats', authMiddleware, chatRoute);
app.use('/api/message', authMiddleware, messageRoute);


app.use('/api/cards', cardRoute);

=======
app.use('/api/users', userRoute);
app.use('/api/chats', authMiddleware, chatRoute);
app.use('/api/message', authMiddleware, messageRoute);
app.use('/api/product', authMiddleware, productRoute);
app.use('/api/likes', authMiddleware, likesRoute);
app.use('/api/contact-us', contactusRoute);
>>>>>>> development
app.get('/', (req, res) => {
  res.send('working');
});

<<<<<<< HEAD
const PORT = /*process.env.PORT ||*/ 5005;

app.listen(PORT, () => {
  console.log('Server is running'+PORT);
=======
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
>>>>>>> development
});
