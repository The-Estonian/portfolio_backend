import db from '../../database/database.js';

const postSummary = (req, res) => {
  console.log('New summary post request');

  const { summary } = req.body;
  const username = req.user.name;

  if (!summary) {
    return res.status(400).json({ error: 'Summary is required' });
  }
  if (username !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  db.run(
    'INSERT OR REPLACE INTO summary (id, summary) VALUES (?, ?)',
    [1, summary],
    function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID, registration: 'Success' });
    }
  );
};

export default postSummary;
