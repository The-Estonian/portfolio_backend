import db from '../../database/database.js';

const postEducation = (req, res) => {
  console.log('New education post request');

  const { title, name, date, duration, desc, website, cert } = req.body;
  const imgUrl = req.file ? req.file.location : null;

  if (!title || !imgUrl) {
    return res.status(400).json({ error: 'Title and image are required' });
  }

  const username = req.user.name;

  if (username !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  db.run(
    'INSERT INTO education (title, img, name, date, duration, desc, website, cert) VALUES (?,?,?,?,?,?,?,?)',
    [title, imgUrl, name, date, duration, desc, website, cert],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, registration: 'Success' });
    }
  );
};

export default postEducation;
