import db from '../../database/database.js';

const postProject = (req, res) => {
  console.log('Project post request');
  let frame;
  let lang;
  let data;
  let { url, description, frameworks, languages, database } = req.body;

  const imgUrl = req.imgUrl || null;
  if (!frameworks) {
    frame = null;
  } else {
    frame = frameworks;
  }
  if (!languages) {
    lang = null;
  } else {
    lang = languages;
  }
  if (!database) {
    data = null;
  } else {
    data = database;
  }
  if (!url || !imgUrl) {
    return res.status(400).json({ error: 'Title and image are required' });
  }

  const username = req.user.name;

  if (username !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }
  console.log('INCOMING DATA', url, description, frame, lang, data, imgUrl);

  db.run(
    'INSERT INTO projects (url, description, frameworks, languages, database, img) VALUES (?,?,?,?,?,?)',
    [url, description, frame, lang, data, imgUrl],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, registration: 'Success' });
    }
  );
};

export default postProject;
