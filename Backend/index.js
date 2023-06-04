const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/config');
const authMiddleware = require('./Middleware/authMiddleware');
const userRoute = require('./Routes/userRoute');
const chatRoute = require('./Routes/chatRoute');
const messageRoute = require('./Routes/messageRoute');

const app = express();
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

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log('Server is running');
});
