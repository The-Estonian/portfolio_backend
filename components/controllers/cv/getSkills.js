import db from '../../database/database.js';

const getSkills = (req, res) => {
  db.all('SELECT * FROM skills', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export default getSkills;
