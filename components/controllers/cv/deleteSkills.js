import db from '../../database/database.js';

const deleteSkills = (req, res) => {
  console.log('New skill delete request');

  const { id } = req.body;
  const username = req.user.name;

  if (!id) {
    return res.status(400).json({ error: 'Skills are required' });
  }
  if (username !== 'Admin') {
    return res.status(403).json({ error: 'Access denied. Admins only.' });
  }

  db.run('DELETE FROM skills WHERE id=?', [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ success: 'success' });
  });
};

export default deleteSkills;
