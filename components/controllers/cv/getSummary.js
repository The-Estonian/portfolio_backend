import db from '../../database/database.js';

const getSummary = (req, res) => {
  db.all('SELECT * FROM summary', [], (err, rows) => {
    if (err) {
      console.log('getSummary error: ', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export default getSummary;
