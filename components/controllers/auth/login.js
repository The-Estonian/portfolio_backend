import db from '../../database/database.js';
import { checkPassword } from '../../helpers/encryption.js';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRATION = '1h';

const login = async (req, res) => {
  const { email, password } = req.body;
  db.all('SELECT * FROM users where email = ?', [email], async (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    if (rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }
    const validated = await checkPassword(password, rows[0].password);

    if (validated) {
      let user = rows[0];
      delete user.password;

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
      });

      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        maxAge: 3600000,
      });
      let responseData = { login: 'success', profile: user };

      if (user.firstName === 'Admin') {
        db.get(
          'SELECT SUM(visit_count) AS total_visits FROM visitor_counts',
          (err, row) => {
            if (err) {
              console.error('Error fetching visitor data:', err);
              return res.json(responseData);
            }

            responseData.visitorData = {
              totalVisits: row?.total_visits || 0,
              lastVisit: new Date().toISOString(),
            };

            res.json(responseData);
          }
        );
      }
    } else {
      res.status(400).json({ error: 'Invalid credentials' });
    }
  });
};

export default login;
