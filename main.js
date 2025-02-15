import express from 'express';
import getUsers from './components/controllers/users/getUsers.js';
import createUser from './components/controllers/users/createUser.js';
import login from './components/controllers/auth/login.js';
import logout from './components/controllers/auth/logout.js';
import status from './components/controllers/auth/status.js';
import alive from './components/controllers/auth/alive.js';
import jwtMiddleware from './components/middleware/jwtMiddleware.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const allowedOrigins = ['https://the-estonian.com', 'http://localhost:5173'];

const app = express();
app.use(express.json());
app.use(cookieParser());
app.set('trust proxy', true);
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.get('/users', jwtMiddleware, getUsers);
app.post('/register', createUser);
app.post('/login', login);
app.post('/logout', logout);
app.get('/status', jwtMiddleware, status);
app.get('/alive', alive);

app.listen(8080, () => console.log('Server running on port 8080'));
