import db from '../../database/database.js';

const getUsers = (req, res) => {  
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export default getUsers;
