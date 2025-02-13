import express from 'express';

import getUsers from './components/controllers/users/getUsers.js';
import createUser from './components/controllers/users/createUser.js';
import login from './components/controllers/auth/login.js';
import jwtMiddleware from './components/middleware/jwtMiddleware.js';
import cookieParser from 'cookie-parser';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())

app.get('/users', jwtMiddleware, getUsers);
app.post('/users', createUser);
app.post('/login', login);

app.listen(3000, () => console.log('Server running on port 3000'));
