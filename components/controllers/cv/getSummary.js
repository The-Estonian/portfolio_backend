import db from '../../database/database.js';

const getSummary = (req, res) => {
  console.log('New summary get request');

  db.all('SELECT * FROM summary', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export default getSummary;
