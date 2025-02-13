import db from '../../database/database.js';

import { hashPassword } from '../../helpers/encryption.js';

const createUser = async (req, res) => {
  let hashedPassword;
  const { firstName, lastName, email, password } = req.body;
  if (password) {
    hashedPassword = await hashPassword(password);
  }

  db.run(
    'INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)',
    [firstName, lastName, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, registration: 'Success' });
    }
  );
};

export default createUser;
