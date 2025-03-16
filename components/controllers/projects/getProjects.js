import db from '../../database/database.js';

const getProjects = (req, res) => {
  console.log('Project get request');
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      console.log('getProject error: ', err);
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ projects: rows });
  });
};

export default getProjects;
