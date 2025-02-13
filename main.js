import express from 'express';

import getUsers from './components/controllers/users/getUsers.js';
import createUser from './components/controllers/users/createUser.js';
import login from './components/controllers/auth/login.js';

const app = express();
app.use(express.json());

app.get('/users', getUsers);
app.post('/users', createUser);
app.post('/login', login);

app.listen(3000, () => console.log('Server running on port 3000'));
