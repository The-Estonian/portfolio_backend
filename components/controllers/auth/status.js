import db from '../../database/database.js';

const status = (req, res) => {
  db.all(
    'SELECT * FROM users where email = ?',
    [req.user.email],
    async (err, rows) => {
      let user = rows[0];
      delete user.password;
      res.json({ status: 'success', profile: user });
    }
  );
};

export default status;
