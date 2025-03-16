import db from '../../database/database.js';

const postSkills = (req, res) => {
  const { skills } = req.body;
  const username = req.user.name;

  if (!skills) {
    return res.status(400).json({ error: 'Skills are required' });
  }
  if (username !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  db.run('INSERT INTO skills (skill) VALUES (?)', [skills], function (err) {
    if (err) {
      console.log('postSkills error: ', err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID, registration: 'Success' });
  });
};

export default postSkills;
