import db from '../../database/database.js';

const getEducation = (req, res) => {
    console.log('New education get request');
  db.all('SELECT * FROM education', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
};

export default getEducation;
