import express from 'express';
import getUsers from './components/controllers/users/getUsers.js';
import createUser from './components/controllers/users/createUser.js';
import login from './components/controllers/auth/login.js';
import logout from './components/controllers/auth/logout.js';
import status from './components/controllers/auth/status.js';
import alive from './components/controllers/auth/alive.js';

import getSkills from './components/controllers/cv/getSkills.js';
import postSkills from './components/controllers/cv/postSkills.js';
import deleteSkills from './components/controllers/cv/deleteSkills.js';

import getEducation from './components/controllers/cv/getEducation.js';
import postEducation from './components/controllers/cv/postEducation.js';
import deleteEducation from './components/controllers/cv/deleteEducation.js';

import visitor from './components/logging/visitor.js';
import jwtMiddleware from './components/middleware/jwtMiddleware.js';
import cookieParser from 'cookie-parser';
import limiter from './components/middleware/rateLimitMiddleware.js';
import cors from './components/middleware/corsMiddleware.js';
import secretMiddleware from './components/middleware/secretMiddleware.js';
import s3Middleware from './components/middleware/s3Middleware.js';

const app = express();

app.options('*', cors);

app.use(express.json());
app.use(cookieParser());
app.use(limiter);
// app.set('trust proxy', true);
app.use(cors);
app.use(secretMiddleware);

app.get('/users', jwtMiddleware, getUsers);

app.get('/getSkills', getSkills);
app.post('/postSkills', jwtMiddleware, postSkills);
app.delete('/deleteSkills', jwtMiddleware, deleteSkills);

app.get('/getEducation', getEducation);
app.post('/postEducation', jwtMiddleware, s3Middleware, postEducation);
app.delete('/deleteEducation', jwtMiddleware, deleteEducation);

app.post('/register', createUser);
app.post('/login', login);
app.post('/logout', logout);
app.get('/status', jwtMiddleware, status);
app.get('/alive', alive);
app.post('/visitor', visitor);

app.listen(8080, () => console.log('Server running on port 8080'));
