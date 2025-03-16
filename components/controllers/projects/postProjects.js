import db from '../../database/database.js';

const postProject = (req, res) => {
  console.log('Project post request');
  let frame;
  let lang;
  let data;
  let activelive;
  let { url, description, frameworks, languages, database, live } = req.body;

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
  if (!live) {
    activelive = null;
  } else {
    activelive = live;
  }
  if (!url || !imgUrl) {
    return res.status(400).json({ error: 'Url and image are required' });
  }

  const username = req.user.name;

  if (username !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  db.run(
    'INSERT INTO projects (url, description, frameworks, languages, database, img, live) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [url, description, frame, lang, data, imgUrl, activelive],
    function (err) {
      if (err) {
        console.log('postProjects error: ', err);
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, registration: 'Success' });
    }
  );
};

export default postProject;
